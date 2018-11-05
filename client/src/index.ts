#!/usr/bin/env node

import { Command } from 'commander';
import { create as createAccount, info as accountInfo } from './ops/account';
import { 
  create as createWorkspace,
  list as listWorkspace,
  checkout as checkoutWorksapce,
} from './ops/workspace';
import { 
  create as createTopic,
  list as listTopic,
} from './ops/topic';

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
    accountInfo();
  }),
});

registerCommandWithSub('workspace', {
  'checkout': cmd => cmd.action(() => {
    checkoutWorksapce();
  }),
  'create [name]': cmd => cmd.action((name) => {
    createWorkspace(name);
  }),
  'list': cmd => cmd.action(() => {
    listWorkspace();
  })
})

registerCommandWithSub('topic', {
  'create [title]': cmd => cmd.action(title => {
    createTopic({ 
      title 
    });
  }),
  'list': cmd => cmd.action(() => {
    listTopic();
  })
})

registerCommandWithSub('task', {
  'create': cmd => cmd.action(title => {

  })
})


program.parse(process.argv);