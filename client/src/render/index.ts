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
  const self = this as blessed.Widgets.LayoutElement;
  const layoutWidth = coods.xl - coods.xi;
  return (el: blessed.Widgets.BoxElement, index: number ) => {
    const last = self.getLastCoords(index);
    const width = Number(el.width);
    if (!last) {
      el.position.top = 0;
      el.position.left = 0;
    } else {
      if (width + last.yl > layoutWidth) {
        el.position.top = last.yi;
        el.position.left = last.xl;
      } else {
        el.position.top = last.yl;
        el.position.left = 0;
      }
    }
  }
}


new Account(layout);
new WorkSpaces(layout);

screen.render();