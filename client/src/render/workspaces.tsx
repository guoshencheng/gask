import * as React from 'react';
import { commonBox } from './style'

export default class WorkSpaces extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    return (
      <box
        class={commonBox.bordered}
        draggable={true}
        border={{type: 'line'}}
        label='Workspace List'
        height='100%'
        width='20%'
      >
      </box>
    )
  }
}