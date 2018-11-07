import * as React from 'react';
import { commonBox } from './style'
export default class WorkSpace extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    return (
      <box
        class={commonBox.bordered}
        label='Workspace Info'
        right='0'
        height='100%'
        width='80%'
      >
      </box>
    )
  }
}