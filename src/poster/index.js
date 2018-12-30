import { EventEmitter } from 'events'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { convertMap, dataConvertToTask, getTask } from '../utils/helpers'

import config from '../../config'

const defaultBoardUrl = 'https://www.luogu.org/paintBoard/board'
const defaultPaintUrl = 'https://www.luogu.org/paintBoard/paint'

const scriptPath = '../../scripts'

const python3 = 'python3'

class DrawerPoster extends EventEmitter {
  constructor (options = {}) {
    super()
    const {
      userJSONPath, taskFilePath, startX, startY,
      boardUrl, paintUrl
    } = options
    this.boardUrl = boardUrl || defaultBoardUrl
    this.paintUrl = paintUrl || defaultPaintUrl
    this.start = { x: startX, y: startY }
    this.users = require(userJSONPath)
    this.taskFilePath = taskFilePath
    //
    this.tasks = [] // necessary
    console.log('poster loaded')
  }

  startTask (force = false) {
    let child
    if (fs.existsSync(this.taskFilePath) && !force) {
      console.log('needn\'t recreate file')
      return
    } else {
      if (process.env.NODE_ENV === 'production')
        child = spawn('python', `${scriptPath}/main.py`)
      else
        child = spawn(python3, `${scriptPath}/main.py`)
    }
    child.on('exit', () => {
      console.log('generate data script run finished')
    })
  }

  registerEvent () {
    this.on('start', () => {
      console.log('start draw')
      for (const k in this.users) {
        const user = this.users[k]
        const cookie = user.cookie
        axios.post(this.paintUrl, {}).then(res => {
          if (res.status === 500) {
            console.error('cooling timing')
          }
        })
      }
    })

    this.on('checkMap', () => {
      // should be a json
      const data = require(this.taskFilePath)
      this.task = dataConvertToTask(data, {
        startX: 100,
        startY: 237
      })
      axios.get(this.boardUrl).then(res => {
        return convertMap(res.data)
      }).then(map => {
        this.tasks = getTask({ data: data, map: map })
      })
    })
  }

  startLoop () {
    this.startTask()
    this.removeAllListeners()
    this.registerEvent()
    const delay = 30 * 1000 + Math.random() * 5
    //
    console.log('emit start event')
    const fn = () => {
      this.emit('start')
      this.emit('checkMap')
    }
    fn(), setTimeout(fn, delay)
  }
}

export const poster = new DrawerPoster({
  userJSONPath: path.resolve(__dirname, '../', '../', 'users.json'),
  taskFilePath: path.resolve(__dirname, '../', '../', 'data.json'),
  startX: config.start.x,
  startY: config.start.y
})

export default poster
