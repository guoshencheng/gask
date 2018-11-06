import * as React from 'react';
import { connect } from 'react-redux';

import { commonBox, table } from './style'
import { actions, StateProps, ShortWorkSpaceType } from './model'

type WorkSpacesPropsType = {
  workspaces: ShortWorkSpaceType[]
}

class WorkSpaces extends React.Component<WorkSpacesPropsType, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    actions.loadWorkspaces();
  }

  onPressCreate = () => {
    console.log(2121);
  }

  render() {
    const { workspaces } = this.props;
    const keys = ['name', 'hash'];
    const data = [keys].concat(workspaces.map(i => keys.map(j => (i as any)[j])))
    return (
      <box
        class={commonBox.bordered}
        draggable={true}
        border={{type: 'line'}}
        label='Workspace List'
        height='100%'
        width='20%'
      >
        <listtable
          class={table}
          keys={true}
          align='center'
          vi={true}
          width='95%'
          height='90%'
          data={data}
        >
        </listtable>
        <blessed-form
          keys
          vi
          focused
          top='90%'
          height='8%'
          width='100%'
          onSubmit={this.onPressCreate}
        >
        </blessed-form>
      </box>
    )
  }
}

export default connect<WorkSpacesPropsType, any, any, StateProps>(state => ({
  workspaces: state.workspaces.list
}))(WorkSpaces)