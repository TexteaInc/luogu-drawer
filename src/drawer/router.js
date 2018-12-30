import Router from 'koa-router'
import axios from 'axios'

const router = new Router()

// fixme error cookie
router.post('/login', async (ctx) => {
  const query = ctx.request.query
  const { username, password, verify } = query
  const cookies = ctx.request.cookies
  return axios.post('https://www.luogu.org/login/loginpage', {
    username: username,
    password: password,
    cookie: 3,
    verify: verify
  }, {
    headers: {
      Cookie: cookies
    }
  }).then(res => {
    return res.data
  })
})

export { router }
