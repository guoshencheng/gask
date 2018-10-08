import { lstat, Stats, readFile, writeFile } from 'fs';
import { join } from 'path'
import { homedir } from 'os';
import * as mkdirp from 'mkdirp';

const $root = join(homedir(), '.gask');
const $configFile = join($root, 'config.json')

export const read = ($path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      readFile($path, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    } catch (err) {
      reject(err);
    }
  })
}

export const write = ($path: string, content: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      writeFile($path, content, {
        encoding: 'utf8',
      }, (err: NodeJS.ErrnoException) => {
        if (err) {
          reject(err);
        } else {
          resolve($path)
        }
      })
    } catch (err) {
      reject(err);
    }
  })
}

export const lstats = ($path: string): Promise<Stats> => {
  return new Promise((resolve, reject) => {
    try {
      lstat($path, (err: NodeJS.ErrnoException, stats: Stats) => {
       if (err) {
          reject(err);
        } else {
          resolve(stats);
        }
      })
    } catch (e) {
      reject(e);
    }
  })
}

export const mkdir = ($path: string) => {
  return new Promise((resolve, reject) => {
    try {
      mkdirp($path, (err: NodeJS.ErrnoException) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      })
    } catch (err) {
      reject(err);
    }
  })
}

export const checkDir = (dir: string) => (tar: Object, key: string, descriptor: TypedPropertyDescriptor<any>): any => ({
  ...descriptor,
  async value(...rest: any[]) {
    try {
      const stats = await lstats(dir);
      if (!stats.isDirectory) {
        mkdir(dir);
      }
    } catch (e) {
      mkdir(dir);
    } finally {
      return descriptor.value.call(tar, ...rest);
    }
  }
})

class FileManager {
  @checkDir($root)
  writeConfigFile(data: any): Promise<string> {
    return write($configFile, JSON.stringify(data));
  }

  @checkDir($root)
  async readConfigFile(): Promise<any> {
    const configString = await read($configFile);
    return JSON.parse(configString);
  }
}

const fm = new FileManager();

export default fm;