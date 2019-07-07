import { ModelOptions } from 'sequelize'

export const commonModelOptions = {
  updatedAt: 'gmtModified',
  createdAt: 'gmtCreated',
} as ModelOptions
