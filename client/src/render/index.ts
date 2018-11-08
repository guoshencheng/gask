import * as blessed from 'blessed';
import screen from './screen';
import Account from './account';

const layout = blessed.box({
  parent: screen,
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  style: {
    border: {
    }
  }
});

screen.render();

new Account(layout);

screen.render();