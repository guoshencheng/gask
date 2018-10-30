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