import file from '../utils/file';

export const set = async (key: string, value: string): Promise<any> => {
  const config = await file.readConfigFile();
  config[key] = value;
  await file.writeConfigFile(config);
  return config;
}

export const get = async (key: string): Promise<string> => {
  const config = await file.readConfigFile();
  return config[key];
}