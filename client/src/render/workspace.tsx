import * as React from 'react';

export default class WorkSpace extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }
  render() {
    return (
      <box
        border={{type: 'line'}}
        label='Workspace Info'
        left='20%'
        height='100%'
        width='80%'
      >
      </box>
    )
  }
}