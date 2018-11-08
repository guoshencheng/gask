import * as blessed from 'blessed';
import { WarmPrimary, ColdPrimary } from './colors';


export default class Account {

  container: blessed.Widgets.BoxElement
  email: blessed.Widgets.BoxElement
  username: blessed.Widgets.BoxElement
  parent: blessed.Widgets.BlessedElement

  constructor(parent: blessed.Widgets.BlessedElement) {
    this.parent = parent;
    this.container = blessed.box({
      parent: parent,
      width: '100%',
      height: 'shrink',
      style: {
        bg: WarmPrimary
      }
    })
    this.email = blessed.box({
      padding: 1,
      tags: true,
      shrink: true,
      width: 'shrink',
      style: {
        bg: ColdPrimary
      },
      content: `Email: guoshencheng@gmail.com`
    })
    this.container.append(this.email);
    this.username = blessed.box({
      left: this.email.content.length + 2 + (Number(this.email.left) || 0) + 2,
      padding: 1,
      tags: true,
      shrink: true,
      width: 'shrink',
      style: {
        bg: ColdPrimary
      },
      content: `Username: guoshencheng`
    })
    this.container.append(this.username);
  }
}
