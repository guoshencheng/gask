import { create, query, update, _drop, storageFile } from '../src/storage'
import { statSync } from 'fs'

describe('storage feature test', () => {
  const modelName = 'gask-test-model'
  const guoshencheng = {
    name: 'guoshencheng',
    age: 11,
    job: 'magician',
  }
  const bob = {
    name: 'bob',
    age: 19,
    job: 'joker',
  }

  const jerry = {
    name: 'jerry',
    age: 14,
    job: 'magician',
  }
  it('create model to local file', async () => {
    const result1 = await create(modelName, guoshencheng)
    const result2 = await create(modelName, bob)
    const result3 = await create(modelName, jerry)
    expect(result1.success).toBe(true)
    expect(result2.success).toBe(true)
    expect(result3.success).toBe(true)
    // file must be created
    expect(statSync(storageFile(modelName)).isFile()).toBe(true)
  })
  it('query model', async () => {
    const result = await query(modelName, {
      name: 'guoshencheng',
    })
    expect(result.success).toBe(true)
    expect(result.result[0].age).toEqual(guoshencheng.age)
  })

  it('update model', async () => {
    const result = await update(modelName, {
      name: 'guoshencheng'
    }, {
      age: 12
    })
    expect(result.success).toBe(true)
  })
  it('drop model', async () => {
    const result = await _drop(modelName)
    expect(result.success).toBe(true)
    // file must be deleted
    try {
      statSync(storageFile(modelName)).isFile()
    } catch (e) {
      expect(e).not.toBeUndefined()
    }
  })
})

