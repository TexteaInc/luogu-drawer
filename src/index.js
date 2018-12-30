import { port, appName } from '../config'
import poster from './poster'

poster.startLoop()
console.log(`${appName} loaded on port ${port}`)
