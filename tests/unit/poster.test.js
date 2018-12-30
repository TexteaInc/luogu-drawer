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
  expect(res).toEqual(
    [[10, 10, 1],
      [11, 12, 1],
      [12, 14, 1],
      [13, 16, 1],
      [14, 18, 1],
      [15, 20, 1],
      [16, 22, 1],
      [17, 24, 1],
      [18, 26, 1],
      [19, 28, 1],
      [20, 29, 1]])
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
