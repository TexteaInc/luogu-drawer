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
  const { startX, startY } = config
  const ans = []
  let x = startX, y = startY
  for (const _ in data) {
    const value = data[_]
    if (!Array.isArray(value))
      throw 'data have a wrong structure' + data
    const [_0, _1, _2] = value
    ans.push([_0 + x, _1 + y, _2])
    x++, y++
  }
  return ans
}
