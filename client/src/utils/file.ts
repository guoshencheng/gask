import { lstat, Stats, readFile, writeFile, readdir, unlink } from 'fs';
import { join, dirname } from 'path'
import { homedir } from 'os';
import { generate } from 'shortid';
import { current } from './date';
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

export const _unlink = (dir: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    unlink(dir, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    })
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
  const dirPath = dirname($path);
  await _checkDir(dirPath);
  try {
    const stats = await lstats($path);
    if (!stats.isFile) {
      await _createEmptyFile($path, defaultValue);
    }
  } catch (e) {
    await _createEmptyFile($path, defaultValue);
  }
}

type FilePath = string | ((name: string) => string) | ((opt: any) => string);

export const checkFile = ($path: FilePath, defaultValue?: any) => (tar: Object, key: string, descriptor: TypedPropertyDescriptor<any>): any => ({
  ...descriptor,
  async value(...rest: any[]) {
    defaultValue = defaultValue || '';
    let p = $path;
    if (typeof $path === 'function') {
      p = $path.call(tar, ...rest) as string;
    }
    await _checkFile(p as string, defaultValue);
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

export const checkDir = (dir: FilePath) => (tar: Object, key: string, descriptor: TypedPropertyDescriptor<any>): any => ({
  ...descriptor,
  async value(...rest: any[]) {
    if (typeof dir === 'function') {
      dir = dir.call(tar, ...rest) as string;
    }
    await _checkDir(dir);
    return descriptor.value.call(tar, ...rest);
  }
})

export interface ModelFileOption {
  modelName: string;
  hash?: string;
  value?: any;
}

const modelJson = (modelName: string) => join($root, `${modelName}.json`);

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
  
  @checkFile(modelJson)
  async writeModelJson(modelName: string, value?: any): Promise<string> {
    value = value || [];
    const result = await write(join($root, `${modelName}.json`), JSON.stringify(value));
    return result;
  }

  @checkFile(modelJson, [])
  async readModelJson(modelName: string): Promise<string[]> {
    const modelsJsonString = await read(modelJson(modelName));
    const models = JSON.parse(modelsJsonString) as string[];
    return models;
  }

  async delModel({
    modelName,
    hash,
  }: ModelFileOption): Promise<string> {
    if (hash) {
      const filepath = join($root, modelName, hash);
      await _checkFile(filepath, {});
      await _unlink(filepath);
      return hash;
    } else {
      throw new Error('hash can\'t be null')
    }
  }

  async writeModel({
    modelName,
    hash,
    value
  }: ModelFileOption): Promise<any> {
    value = value || {}
    hash = hash || generate();
    value.hash = hash;
    value.createdAt = value.createdAt ||  current();
    value.updatedAt = current();
    const filepath = join($root, modelName, hash);
    await _checkFile(filepath, value);
    await write(filepath, JSON.stringify(value))
    return value;
  }

  async readModel({
    modelName,
    hash
  }: ModelFileOption): Promise<any> {
    if (hash) {
      const filepath = join($root, modelName, hash);
      await _checkFile(filepath, {});
      const value = await read(filepath)
      return JSON.parse(value)
    } else {
      throw new Error('hash can\'t be null')
    }
  }
}

export class ModelT {
  hash?: string;
  createdAt?: string;
  updatedAt?: string;
}
export class Model<T extends ModelT> {
  name: string;

  constructor(name: string) {
    this.name = name
  }
  async findByHash(hash: string): Promise<T> {
    const model = await fm.readModel({
      modelName: this.name,
      hash,
    });
    return model;
  }

  async delByHash(hash: string): Promise<T> {
    const modelHashs = await fm.readModelJson(this.name);
    const next = modelHashs.filter(i => i != hash);
    const model = await this.findByHash(hash);
    await fm.writeModelJson(this.name, next);
    await fm.delModel({
      modelName: this.name,
      hash,
    })
    return model;
  }

  async create(data: T): Promise<T> {
    const modelHashs = await fm.readModelJson(this.name);
    const model = await fm.writeModel({
      modelName: this.name,
      value: data,
    })
    const next = modelHashs.concat(model.hash);
    await fm.writeModelJson(this.name, next);
    return model;
  }

  async findByHashs(hashs: string[]): Promise<T[]> {
    return Promise.all(hashs.map(hash => fm.readModel({
      modelName: this.name,
      hash,
    })))
  }

  async findAll(): Promise<T[]> {
    const modelHashs = await fm.readModelJson(this.name);
    return Promise.all(modelHashs.map(hash => fm.readModel({
      modelName: this.name,
      hash
    })));
  }
  async save(data: T): Promise<T> {
    if (data.hash) {
      const model = await fm.writeModel({
        modelName: this.name,
        hash: data.hash,
        value: data,
      })
      return model;
    } else {
      return this.create(data);
    }
  }
}

const fm = new FileManager();

export default fm;