#!/usr/bin/env node

import { Command } from 'commander';
import { create } from './ops/users';

const packageJson = require('../package.json');

const program = new Command();

create({
  username: 'guoshencheng',
  email: 'guoshencheng1@gmail.com'
})

program.version(packageJson.version, '-v, --version');

// const argv = process.argv;

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