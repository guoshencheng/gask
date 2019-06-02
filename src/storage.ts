
/**
 * ~/.gask/
 *  |_ storage/
 *    |_ model_name.json
 *    |_ model_name.json
 *    |_ model_name.json
 */
import { homedir } from 'os';
import { sep, parse } from 'path';
import {
  statSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  unlinkSync,
} from 'fs'
import { generate } from 'shortid'

import Condition, { ConditionDescObj } from './condition'

const PREFIX_DIR = `${homedir()}${sep}.gask`
const STORATGE_DIR = `${PREFIX_DIR}${sep}storage`

const checkAndFillPath = (path: string) => {
  const parsed = parse(path)
  const dir = parsed.dir
  try {
    const stats = statSync(dir)
    if (stats.isDirectory()) {
      return
    }
  } catch (e) {
    checkAndFillPath(dir)
  }
  mkdirSync(path)
}

export const storageFile = (name: string) => `${STORATGE_DIR}${sep}${name.toLowerCase()}.json`

const readStorageFile = (file: string): any[] => {
  try {
    const content = readFileSync(file, 'utf8')
    return JSON.parse(content)
  } catch (e) {
    return []
  }
}

const writeStorageFile = (file: string, data: any[]) => {
  const content = JSON.stringify(data, null, 2)
  writeFileSync(file, content, 'utf8')
}

export type StorageResult = {
  success: boolean,
  result?: any,
  error?: any,
}

export const _drop = (name: string): Promise<StorageResult> => {
  const file = storageFile(name)
  checkAndFillPath(file)
  return new Promise((resolve, reject) => {
    try {
      unlinkSync(file)
      resolve({
        success: true,
      })
    } catch (e) {
      resolve({
        success: false,
        error: e,
      })
    }
  })
}

export const batchCreate = async (name: string, objs: any[]): Promise<StorageResult> => {
  const file = storageFile(name)
  checkAndFillPath(file)
  const list = readStorageFile(file) || []
  return new Promise((resolve, reject) => {
    try {
      const next = objs.map(obj => ({
        ...obj,
        _id: generate(),
      }))
      writeStorageFile(file, list.concat(next))
      resolve({
        result: next,
        success: true,
      })
    } catch (e) {
      resolve({
        success: false,
        error: e
      })
    }
  })
}

export const create = async (name: string, obj: any): Promise<StorageResult> => {
  const file = storageFile(name)
  checkAndFillPath(file)
  const objs = readStorageFile(file) || []
  return new Promise((resolve, reject) => {
    try {
      const next = {
        ...obj,
        _id: generate(),
      }
      writeStorageFile(file, objs.concat(next))
      resolve({
        result: next,
        success: true,
      })
    } catch (e) {
      resolve({
        success: false,
        error: e
      })
    }
  })
}

export const query = (name: string, condition?: ConditionDescObj | Condition): Promise<StorageResult> => {
  const file = storageFile(name)
  checkAndFillPath(file)
  return new Promise((resolve) => {
    try {
      const contents = readStorageFile(file)
      let result
      if (condition instanceof Condition) {
        result = contents.filter(condition.filter)
      } else {
        result = contents.filter(new Condition(condition || {}).filter)
      }
      resolve({
        success: true,
        result,
      })
    } catch (e) {
      resolve({
        success: false,
        error: e,
      })
    }
  })
}

export const update = (name: string, condition: ConditionDescObj | Condition, patch: any): Promise<StorageResult> => {
  const file = storageFile(name)
  checkAndFillPath(file)
  return new Promise((resolve) => {
    try {
      const contents = readStorageFile(file)
      const con = (condition instanceof Condition) ? condition : new Condition(condition)
      const next = contents.map((item, index) => con.filter(item, index) ? ({ ...item, ...patch }) : item)
      writeStorageFile(file, next)
      resolve({
        success: true,
        result: next,
      })
    } catch (e) {
      resolve({
        success: false,
        error: e,
      })
    }
  })
}

