import Koa from 'koa'
import logger from 'koa-logger'
import { router } from './router'

const drawerServer = new Koa()

// todo
drawerServer.use(router.routes())
drawerServer.use(router.allowedMethods())
drawerServer.use(logger())

export { drawerServer }
