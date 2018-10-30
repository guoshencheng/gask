import * as inquirer from 'inquirer';

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
    message: 'Do you want continue'
  })
}