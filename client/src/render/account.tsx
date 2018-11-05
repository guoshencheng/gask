import * as React from 'react';
import { connect } from 'react-redux';
import { StateProps, AccountStateType, actions } from './model'

import { commonBox } from './style'

class Acccount extends React.Component<{
  account: AccountStateType
}, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    actions.loadAccount();
  }

  render() {
    const { account } = this.props;
    return (
      <box
        class={commonBox.bordered}
        label='Account Info'
        height='10%'
        width='100%'
      >
        <box
          top='center'
        >
          {`UserName: ${account.username || ''}`}
        </box>
        <box
          top='center'
        >
          {`Email: ${account.email || ''}`}
        </box>
      </box>
    )
  }
}

export default connect<any, any, any, StateProps>(state => ({
  account: state.account
}))(Acccount);