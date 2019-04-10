
/**
 * ~/.gask/
 *  |_ storage/
 *    |_ model_name.json
 *    |_ model_name.json
 *    |_ model_name.json
 */
import { homedir } from 'os';
import { sep, parse } from 'path';
import { statSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
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

export const create = (name: string, obj: any) => {
  const file = storageFile(name)
  checkAndFillPath(file)
  const objs = readStorageFile(file) || []
  writeStorageFile(file, objs.concat({
    ...obj,
    _id: generate(),
  }))
}

export const query = (name: string, condition: ConditionDescObj | Condition) => {
  const file = storageFile(name)
  checkAndFillPath(file)
  const contents = readStorageFile(file)
  if (condition instanceof Condition) {
    return contents.filter(condition.filter)
  } else {
    return contents.filter(new Condition(condition).filter)
  }
}

export const update = (name: string, condition: ConditionDescObj | Condition, patch: any) => {
  const file = storageFile(name)
  checkAndFillPath(file)
  const contents = readStorageFile(file)
  const con = (condition instanceof Condition) ? condition : new Condition(condition)
  const next = contents.map((item, index) => con.filter(item, index) ? ({ ...item, ...patch }) : item)
  return next
}
