import forEach from 'lodash/forEach'

export function convertMap (map) {
  const _ = []
  map.trim().split('\n').forEach((v, k) => {
    _[k] = new Proxy({ value: v }, {
      get (target, p) {
        const val = target.value[p]
        return parseInt(val, 36)
      }
    })
  })
  return _
}

export function dataConvertToTask (data, config = {}) {
  const { startX = 0, startY = 0 } = config
  const _ = []
  forEach(data, val => {
    if (!Array.isArray(val))
      throw 'data have a wrong structure' + data
    const [_0, _1, _2] = val
    _.push([_0 + startX, _1 + startY, _2])
  })
  return _
}

export function getTask (data, map) {
  if (data === undefined || map === undefined)
    throw 'error args'
  const _ = []
  forEach(data, (val) => {
    const [x, y, color] = val
    if (parseInt(map[x][y]) === parseInt(color)) {
      //
    } else {
      _.push(val)
    }
  })
  return _
}
