import * as blessed from 'blessed';
import screen from './screen';
import Account from './account';
import WorkSpaces from './workspaces';

const layout = blessed.layout({
  layout: 'inline',
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

layout.renderer = function(coods: blessed.Widgets.Coords) {

}


new Account(layout);
new WorkSpaces(layout);

screen.render();