import * as blessed from 'blessed';
import { WarmPrimary } from './colors';

export default class WorkSpaceList {
  parent: blessed.Widgets.BlessedElement
  container: blessed.Widgets.LayoutElement
  blocks: blessed.Widgets.BoxElement[]
  items: string[]
  selected: number;
  constructor(parent: blessed.Widgets.BlessedElement) {
    this.parent = parent;
    this.selected = 0;
    this.container = blessed.layout({
      height: '100%',
      layout: 'inline',
      width: '20%',
      parent,
    })
    this.items = ['1111', '33333']
    this.blocks = this.items.map((item, index) => {
      return blessed.box({
        style: {
          bg: this.selected === index ? WarmPrimary : ''
        },
        padding: {
          top: 1,
          bottom: 1,
        },
        shrink: true,
        height: 'shrink',
        width: '100%',
        parent: this.container,
        content: item
      })
    })
  }
}