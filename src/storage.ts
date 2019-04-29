
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
  try {
    const stats = statSync(path)
    if (stats.isDirectory()) {
      return
    }
  } catch (e) {
    checkAndFillPath(parsed.dir)
    /* handle error */
  }
  mkdirSync(path)
}

const storageFile = (name: string) => `${STORATGE_DIR}${sep}${name.toLowerCase()}.json`

const readStorageFile = (file: string): any[] => {
  const content = readFileSync(file, 'utf8')
  return JSON.parse(content)
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

export const create = async (name: string, obj: any): Promise<StorageResult> => {
  const file = storageFile(name)
  checkAndFillPath(file)
  const objs = readStorageFile(file) || []
  return new Promise((resolve, reject) => {
    try {
      writeStorageFile(file, objs.concat({
        ...obj,
        _id: generate(),
      }))
      resolve({
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

export const query = (name: string, condition: ConditionDescObj | Condition): Promise<StorageResult> => {
  const file = storageFile(name)
  checkAndFillPath(file)
  return new Promise((resolve) => {
    try {
      const contents = readStorageFile(file)
      let result
      if (condition instanceof Condition) {
        result = contents.filter(condition.filter)
      } else {
        result = contents.filter(new Condition(condition).filter)
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

