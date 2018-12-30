const fs = require('fs')
const resolve = require('path').resolve
const path = './bread.json'   // edit your path
const bread = require(path)
const x = 736
const y = 336
const data = []
for (const _ in bread) {
  const o = bread[_]
  const [_0, _1, _2] = o
  if (!_0 || !_1) throw 'error'
  data.push([_0 - x, _1 - y, _2])
}
try {
  fs.writeFile(resolve(__dirname, 'bread.json'), JSON.stringify(data), () => {
    console.log('finished')
  })
} catch (e) {
  throw e
}
