/// <reference types="node" />


declare module 'react-blessed' {
  import { Widgets, screen } from 'blessed';
  import * as React from 'react';
  export function render(c: JSX.Element, s: Widgets.Screen): void;
}

declare namespace JSX {
  interface IntrinsicElements {
    'box': any,
    'listtable': any,
  }
}