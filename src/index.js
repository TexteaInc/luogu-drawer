import { port, corsPort, appName } from '../config'
import { createServer } from 'cors-anywhere'

// init drawer
import { drawerServer } from './drawer'

// dont remove cookie
createServer({
  originWhitelist: [],
  requireHeader: ['origin', 'x-requested-with']
}).listen(corsPort, () => {
  console.log('cors-anywhere load success')
})


drawerServer.listen(port, () => {
  console.log(`${appName} load success`)
})
