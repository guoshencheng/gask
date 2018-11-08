import * as blessed from 'blessed';

const screen = blessed.screen({
  smartCSR: true,
  dockBorders: true,
  fullUnicode: true,
})

export default screen;