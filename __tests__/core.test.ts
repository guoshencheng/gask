import {
  TaskObj,
  create,
  batchCreate,
  check,
  achive,
  list,
  listByGroup,
  _drop,
} from '../src/core'
import { Op } from '../src/condition'

describe('task core test', () => {
  const taskNames = 'a,b,c,d,e,f,g'.split(',')
  const groupNames = taskNames.map(i => `group-${i}`)
  const importTasks = taskNames.map(i => {
    const index = Math.floor(Math.random() * groupNames.length)
    const group = groupNames[index]
    return {
      name: i,
      group,
    }
  })
  const grouped = importTasks.reduce((pre, cur) => {
    pre[cur.group] = (pre[cur.group] || []).concat(cur)
    return pre
  }, {} as any)
  it('create task', async () => {
    await _drop()
    const task = await create({
      name: taskNames[0],
      group: groupNames[0],
    })
    expect(task._id).not.toBeUndefined()
    expect(task.created).not.toBeUndefined()
    expect(task.achived).toEqual(0)
    expect(task.checked).toEqual(0)
    expect(task.name).toEqual(taskNames[0])
    expect(task.group).toEqual(groupNames[0])
  })

  it('batch create tasks',  async () => {
    await _drop()
    const tasks = await batchCreate(importTasks)
    tasks.forEach((task: TaskObj, index: number) => {
      expect(task._id).not.toBeUndefined()
      expect(task.created).not.toBeUndefined()
      expect(task.achived).toEqual(0)
      expect(task.checked).toEqual(0)
      expect(task.name).toEqual(taskNames[index])
    })
  })

  it('query tasks all', async () => {
    await _drop()
    await batchCreate(importTasks)
    const tasks = await list()
    expect(tasks.length).toEqual(importTasks.length)
  })

  it('query tasks all grouped', async () => {
    await _drop()
    await batchCreate(importTasks)
    const groupedTask = await listByGroup()
    Object.keys(grouped).forEach(key => {
      expect(grouped[key].length).toEqual(groupedTask[key].length)
    })
  })

  it('check tasks', async () => {
    await _drop()
    let tasks = await batchCreate(importTasks)
    const ids = tasks.map(i => i._id).slice(0, 3).filter(i => !!i)
    await check(ids as string[])
    tasks = await list({
      _id: {
        [Op.in]: ids,
      }
    })
    tasks.forEach(t => {
      expect(t.checked).toEqual(1)
    })
  })

  it('check tasks', async () => {
    await _drop()
    let tasks = await batchCreate(importTasks)
    const ids = tasks.map(i => i._id).slice(0, 3).filter(i => !!i)
    await achive(ids as string[])
    tasks = await list({
      _id: {
        [Op.in]: ids,
      }
    })
    tasks.forEach(t => {
      expect(t.achived).toEqual(1)
    })
  })

})

