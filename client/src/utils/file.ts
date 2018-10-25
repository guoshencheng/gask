import { lstat, Stats, readFile, writeFile, readdir } from 'fs';
import { join, dirname } from 'path'
import { homedir } from 'os';
import * as mkdirp from 'mkdirp';

const $root = join(homedir(), '.gask');
const $configFile = join($root, 'config.json')
const $workspacesJson = join($root, 'workspaces.json');
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

export const _readdir = (dir: string, options: string | any): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    try {
      readdir(dir, options, (err: NodeJS.ErrnoException, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files);
        }
      })
    } catch (error) {
      reject(error);
    }
  })
}

const _createEmptyFile = async ($path: string, defaultValue: any) => {
  return write($path, !!defaultValue ? JSON.stringify(defaultValue) : '');
}

const _checkFile = async ($path: string, defaultValue: any) => {
  try {
    const stats = await lstats($path);
    if (!stats.isFile) {
      _createEmptyFile($path, defaultValue);
    }
  } catch (e) {
    _createEmptyFile($path, defaultValue);
  }
}

export const checkFile = ($path: string | ((name: string) => string), defaultValue?: any) => (tar: Object, key: string, descriptor: TypedPropertyDescriptor<any>): any => ({
  ...descriptor,
  async value(...rest: any[]) {
    defaultValue = defaultValue || '';
    if (typeof $path === 'function') {
      $path = $path.call(tar, ...rest) as string;
    }
    const dirPath = dirname($path);
    await _checkDir(dirPath);
    await _checkFile($path, defaultValue);
    return descriptor.value.call(tar, ...rest);
  }
})

const _checkDir = async (dir: string) => {
  try {
    const stats = await lstats(dir);
    if (!stats.isDirectory) {
      await mkdir(dir);
    }
  } catch (e) {
    await mkdir(dir);
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
  // 写入总配置文件
  @checkDir($root)
  @checkFile($configFile)
  writeConfigFile(data: any): Promise<string> {
    return write($configFile, JSON.stringify(data, null, 2));
  }

  // 读取总配置文件
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

  // 写入 workspace 文件
  @checkFile(workspaceFile)
  async writeWorkspace(name: string, value: any): Promise<string> {
    const result = await write(join($workspaces, name), JSON.stringify(value));
    return result;
  }

  // 读取 workspace 文件
  @checkFile(workspaceFile)
  async readWorkspace(name: string): Promise<any> {
    const result = await read(join($workspaces, name));
    const workspace = JSON.parse(result) as any[];
    return workspace;
  }

  // 写入workspace json
  @checkFile($workspacesJson)
  async writeWorkSpaceJson(value: any[]): Promise<string> {
    const result = await write($workspacesJson, JSON.stringify(value));
    return result;
  }

  // 读取workspace json
  @checkFile($workspacesJson)
  async readWorkSpaceJson(): Promise<any[]> {
    const workspacesString = await read($workspacesJson);
    const workspaces = JSON.parse(workspacesString) as any[];
    return workspaces;
  }
}

const fm = new FileManager();

export default fm;