import Koa from 'koa'
import { router } from './router'

const drawerServer = new Koa()

drawerServer.use(router.routes())
drawerServer.use(router.allowedMethods())

export { drawerServer }
