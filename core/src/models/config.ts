export class ConfigModel {
  currentUserId: string
}

export interface ConfigDBOp {
  find(): Promise<ConfigModel>
  create(config: ConfigModel): Promise<ConfigModel>
  update(config: ConfigModel): Promise<ConfigModel>
}