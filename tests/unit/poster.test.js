import { convertMap, dataConvertToTask, getTask } from '../../src/utils/helpers'

it('should convert map', () => {
  const map = require('./data').map
  const res = convertMap(map)
  expect(res[0][0]).toEqual(14)
  expect(res[2][0]).toEqual(3)
})

it('should convert data', () => {
  const task = require('./data').task
  const res = dataConvertToTask(task, {
    startX: 10,
    startY: 10
  })
  expect(res.sort()).toEqual(
    [[10, 10, 1], [10, 11, 1], [10, 12, 1], [10, 13, 1], [10, 14, 1], [10, 15, 1], [10, 16, 1], [10, 17, 1], [10, 18, 1], [10, 19, 1], [10, 20, 1]]
  )
})

it('should get task', function () {
  const res = getTask([
    [0, 0, 1],
    [0, 1, 1],
    [0, 2, 1]
  ], [
    '1122',
    '2222',
    '2222'
  ])
  expect(res.length).toEqual(1)
})
