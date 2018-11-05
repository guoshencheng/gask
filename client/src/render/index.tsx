import * as React from 'react';
import * as blessed from 'blessed';
import { render } from 'react-blessed';

import WorkSpaces from './workspaces';
import WorkSpace from './workspace';

const { Component } = React;

class App extends Component {
  render() {
    return (
      <>
        <WorkSpaces></WorkSpaces>
        <WorkSpace></WorkSpace>
      </>
    );
  }
}

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'hello world',
})

screen.key(['escape', 'q', 'C-c'], function() {
  return process.exit(0);
});

render(<App />, screen);