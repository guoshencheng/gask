/// <reference types="node" />


declare module 'react-blessed2' {
  import { Widgets, screen } from 'blessed';
  import * as React from 'react';
  export type JsxTagMapping = (origin: string) => string | undefined;
  export type renderOptions = {
    jsxTagMapping: JsxTagMapping,
  }
  export function render(c: JSX.Element, s: Widgets.Screen, options: renderOptions): void;
}

declare namespace JSX {
  interface IntrinsicElements {
    'box': any,
    'listtable': any,
    'blessed-button': any,
    'blessed-form': any
  }
}