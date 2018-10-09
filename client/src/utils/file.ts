import { lstat, Stats, readFile, writeFile } from 'fs';
import { join, dirname } from 'path'
import { homedir } from 'os';
import * as mkdirp from 'mkdirp';

const $root = join(homedir(), '.gask');
const $configFile = join($root, 'config.json')
const $workspaces = join($root, 'workspaces');

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
      writeFile($path, `${content}\n`, {
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

const _createEmptyFile = async ($path: string) => {
  return write($path, '');
}

const _checkFile = async ($path: string) => {
  try {
    const stats = await lstats($path);
    if (!stats.isFile) {
      _createEmptyFile($path);
    }
  } catch (e) {
    _createEmptyFile($path);
  }
}

export const checkFile = ($path: string | ((name: string) => string)) => (tar: Object, key: string, descriptor: TypedPropertyDescriptor<any>): any => ({
  ...descriptor,
  async value(...rest: any[]) {
    if (typeof $path === 'function') {
      $path = $path.call(tar, ...rest) as string;
    }
    const dirPath = dirname($path);
    await _checkDir(dirPath);
    await _checkFile($path);
    return descriptor.value.call(tar, ...rest);
  }
})

const _checkDir = async (dir: string) => {
  try {
    const stats = await lstats(dir);
    if (!stats.isDirectory) {
      mkdir(dir);
    }
  } catch (e) {
    mkdir(dir);
  }
}

export const checkDir = (dir: string | ((name: string) => string)) => (tar: Object, key: string, descriptor: TypedPropertyDescriptor<any>): any => ({
  ...descriptor,
  async value(...rest: any[]) {
    if (typeof dir === 'function') {
      dir = dir.call(tar, ...rest) as string;
    }
    await _checkDir(dir);
    return descriptor.value.call(tar, ...rest);
  }
})

const workspaceFile = (wname: string): string => join($workspaces, wname);

class FileManager {
  @checkDir($root)
  @checkFile($configFile)
  writeConfigFile(data: any): Promise<string> {
    return write($configFile, JSON.stringify(data, null, 2));
  }

  @checkDir($root)
  @checkFile($configFile)
  async readConfigFile(): Promise<any> {
    const configString = await read($configFile);
    try {
      return JSON.parse(configString);
    } catch (_) {
      return {};
    }
  }

  @checkFile(workspaceFile)
  async readWorkspace(wname: string) {
    const $workspaceFile = workspaceFile(wname);
    const workspace = await read($workspaceFile);
    try {
      return JSON.parse(workspace);
    } catch (_) {
      return {};
    }
  }

  @checkFile(workspaceFile)
  async writeWorkspace(wname: string, data: any) {
    const $workspaceFile = workspaceFile(wname);
    return write($workspaceFile, JSON.stringify(data, null, 2));
  }
}

const fm = new FileManager();

export default fm;