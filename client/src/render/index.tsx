import * as React from 'react';
import * as blessed from 'blessed';
import { render } from 'react-blessed';
import { Provider } from 'react-redux'

import store from './model';
import WorkSpaces from './workspaces';
import WorkSpace from './workspace';
import AccountInfo from './account';

const { Component } = React;

class App extends Component {
  render() {
    return (
      <>
        <AccountInfo></AccountInfo>
        <box
          left='0'
          top='10%'
          width='100%'
          height='80%'
        >
          <WorkSpaces></WorkSpaces>
          <WorkSpace></WorkSpace>
        </box>
      </>
    );
  }
}

const screen = blessed.screen({
  fullUnicode: true,
  autoPadding: true,
  smartCSR: true,
  title: 'hello world',
})

screen.key(['escape', 'q', 'C-c'], function() {
  return process.exit(0);
});

render(
  <Provider store={store}>
    <App />
  </Provider>
, screen);