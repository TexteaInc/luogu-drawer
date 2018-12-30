import { EventEmitter } from 'events'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import axios from 'axios'

const scriptPath = '../../scripts'

const python3 = 'python3'

class DrawerPoster extends EventEmitter {
  constructor (options = {}) {
    super()
    const { userJSONPath, taskFilePath } = options
    this.users = require(userJSONPath)
    this.taskFilePath = taskFilePath

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
      axios.get('https://www.luogu.org/paintBoard/board').then(res => {

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
    this.emit('start')
    setTimeout(() => {
      console.log('emit start event')
      this.emit('start')
    }, delay)
  }
}

export const poster = new DrawerPoster({
  userJSONPath: path.resolve(__dirname, '../', '../', 'config.json'),
  taskFilePath: path.resolve(__dirname, '../', '../', 'data.json')
})

export default poster
