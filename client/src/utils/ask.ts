import * as inquirer from 'inquirer';
import { WorkSpaceT } from '../ops/workspace';

export const chooseWorkspace = (workspaces: WorkSpaceT[]): Promise<{ workspace: WorkSpaceT }> => {
  return inquirer.prompt({
    type: 'list',
    name: 'workspace',
    message: 'Choose a workspace',
    choices: workspaces.map(i => ({
      name: i.name,
      value: i,
    }))
  })
}

export const account = (): Promise<{ username: string, email: string }> => {
  return inquirer.prompt([{
    name: 'username',
    message: 'Enter your username?',
  }, {
    name: 'email',
    message: 'Enter your email?',
  }])
}

export const ifContinue = (): Promise<{ continue: boolean }> => {
  return inquirer.prompt({
    type: 'confirm',
    name: 'continue',
    message: 'Do you want continue?'
  })
}

export const suggestToCreateAccount = (): Promise<{ create: boolean }> => {
  return inquirer.prompt({
    type: 'confirm',
    name: 'create',
    message: 'No account, Do you want create one?'
  })
}