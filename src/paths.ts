import { homedir } from 'os';
import { sep } from 'path';

export const PREFIX_DIR = `${homedir()}${sep}.gask`
export const CONFIG_FILE = `${PREFIX_DIR}${sep}config.json`
export const SQLITE_FILE = `${PREFIX_DIR}${sep}database.sqlite`
export const PLUGINS_DIR = `${PREFIX_DIR}${sep}plugins`
export const STORATGE_DIR = `${PREFIX_DIR}${sep}storage`
