import * as React from 'react';

import { commonBox } from './style'

export default class Acccount extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    return (
      <box
        class={commonBox.bordered}
        label='Account Info'
        height='10%'
        width='100%'
      >
      </box>
    )
  }
}