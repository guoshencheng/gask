#!/usr/bin/env node

import { Command } from 'commander';
import { create as createAccount } from './ops/account';

const packageJson = require('../package.json');

const program = new Command();

program.version(packageJson.version, '-v, --version');


const argv = process.argv;

export type CommendOption = (cmd: Command) => Command;
export type CommendOptions = {
  [key: string]: CommendOption
}

const registerCommandWithSub = (name: string, cmds: CommendOptions) => {
  const sub = new Command();
  Object.keys(cmds).forEach(key => {
    const cmd = cmds[key];
    cmd(sub.command(key));
  })
  program.command(name)
    .action(() => {
      sub.parse([...argv.slice(0, 2), ...argv.slice(3)])
    })
}

registerCommandWithSub('account', {
  create: cmd => cmd.action(() => {
    createAccount();
  }),
  info: cmd => cmd.action(() => {
    console.log('account info');
  }),
});

program.command('init [name]')
  .action((name) => {
    console.log(name);
  })

program.command('config')
  .action((...args) => {
    console.log(args);
  });

program.command('task')
  .action(() => {

})

program.command('tg')
  .action(() => {

})

program.command('workspace')
  .action(() => {

})

program.command('login')
  .action(() => {

})

program.parse(process.argv);