import { EventEmitter } from 'events'
import qs from 'qs'
import path from 'path'
import axios from 'axios'
import { convertMap, getTask } from '../utils/helpers'
import random from 'lodash/random'
import cloneDeep from 'lodash/cloneDeep'

import config from '../../config'

const defaults = {
  boardUrl: 'https://www.luogu.org/paintBoard/board',
  paintUrl: 'https://www.luogu.org/paintBoard/paint',
  postDuration: 30,
  checkDuration: 500
}

class DrawerPoster extends EventEmitter {
  constructor (options = {}) {
    super()
    const {
      userJSONPath, taskFilePath,
      boardUrl, paintUrl, tasks,
      checkDuration, postDuration
    } = options
    this.boardUrl = boardUrl || defaults.boardUrl
    this.paintUrl = paintUrl || defaults.paintUrl
    this.users = require(userJSONPath)
    this.taskFilePath = taskFilePath
    this._registerTasks = tasks || []
    this.checkDuration = checkDuration || defaults.checkDuration
    this.postDuration = postDuration || defaults.postDuration
    //
    this.tasks = [] // necessary
    this._ID = 0

    this.loadTasks()
    console.log('poster loaded')
  }

  loadTasks () {
    for (const k in this._registerTasks) {
      const task = this._registerTasks[k]
      const { name, x, y, use = true } = task
      if (!use) continue
      const pth = path.resolve(this.taskFilePath, name)
      console.log('loading', pth)
      const json = require(pth)
      for (const _ in json) {
        const [_0, _1, _2] = json[_]
        this.tasks.push([_0 + x, _1 + y, _2])
      }
      console.log('loading finished')
    }
    this.originTasks = cloneDeep(this.tasks)
    console.log('registered task', this.tasks.length)
  }

  async checkMap () {
    await axios.get(this.boardUrl).then(res => {
      return convertMap(res.data)
    }).then(map => {
      this.tasks = getTask(this.originTasks, map)
      console.log('registered tasks are', this.tasks.length)
      if (this.tasks.length === 0) {
        console.log('no tasks, stop seconds')
        clearInterval(this._ID)
        this._ID = 0
      }
      if (this._ID === 0) {
        this._ID = setInterval(() => this.emit('start'), this.postDuration * 1000)
      }
    })
  }


  async registerEvent () {
    await this.on('start', async () => {
      console.log('start draw')
      for (const k in this.users) {
        const user = this.users[k]
        const cookie = user.cookie
        const handleTask = (task) => {
          if (!Array.isArray(task)) return []
          const [x, y, color] = task
          return { x: x, y: y, color: color }
        }
        const num = random(0, this.tasks.length - 1)
        const temp = this.tasks[num]
        this.tasks.splice(num, 1)
        const task = qs.stringify(handleTask(temp))
        if (task === '') return
        await axios({
          method: 'post',
          url: this.paintUrl,
          data: task,
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'origin': 'https://www.luogu.org',
            'cookie': cookie,
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
          }
        }).then(res => {
          if (res.data.status !== 200) {
            console.error(`status: ${res.data.status} ${res.data.data}`, `on ${user.id} ${user.cookie.substring(0, 20)}`, new Date())
            this.tasks.push(temp)
          } else {
            console.log(res.data.status, task)
          }
        }).catch(err => {
          console.error('未知错误', err.Error || err)
        })
      }
    })
    await this.on('checkMap', this.checkMap)
  }

  async startLoop () {
    this.removeAllListeners()
    await this.checkMap().then(async () => {
      await this.registerEvent()
      const longDelay = this.checkDuration * 1000 + Math.random() * 10
      console.log('emit start event')
      setInterval(() => {
        this.emit('checkMap')
      }, longDelay)
    })
  }
}

export const poster = new DrawerPoster({
  userJSONPath: path.resolve(__dirname, '../', '../', 'users.json'),
  taskFilePath: path.resolve(__dirname, '../', '../', 'data'),
  tasks: config.data,
  checkDuration: config.checkDuration,
  postDuration: config.postDuration
})

export default poster
