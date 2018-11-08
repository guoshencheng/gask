import * as blessed from 'blessed';
import { ColdSupport } from './colors';


export default class WorkSpaceList {
  parent: blessed.Widgets.BlessedElement
  container: blessed.Widgets.BoxElement
  list: blessed.Widgets.ListElement
  constructor(parent: blessed.Widgets.BlessedElement) {
    this.parent = parent;
    this.container = blessed.box({
      parent,
    })
    this.list = blessed.list({
      style: {
        item: {
          bg: ColdSupport,
        }
      },
      items: [
        '112121',
        '21212',
      ]
    })
    this.container.append(this.list);
  }
}