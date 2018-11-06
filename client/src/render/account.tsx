import * as React from 'react';
import { connect } from 'react-redux';
import { StateProps, AccountStateType, actions } from './model'

import { accountBox } from './style'

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
        class={accountBox.bordered}
        label='Account Info'
        height='10%'
        width='100%'
      >
        <box
          top='center'
          left='1%'
          align='center'
          width='25%'
        >
          {`UserName: ${account.username || ''}`}
        </box>
        <box
          top='center'
          left='27%'
          align='center'
          width='25%'
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