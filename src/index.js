import { port, corsPort, appName } from '../config'
import { createServer } from './cors/cors-anywhere'
import poster from './poster'

// init drawer
// todo
import { drawerServer } from './drawer'

// dont remove cookie
createServer().listen(corsPort, () => {
  console.log('cors-anywhere load success')
})


poster.startLoop()
