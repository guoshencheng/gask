import { 
  Action,
  Dispatch,
  createStore,
  combineReducers,
  applyMiddleware,
  bindActionCreators,
} from 'redux';
import reduxThunk from 'redux-thunk';
import { getAccount } from '../ops/account';

export const types = {
  account: {
    SET_ACCOUNT: 'SET_ACCOUNT',
  },
  workspace: {
    SWITCH_CURRENT_WORKSPACE: 'SWITCH_CURRENT_WORKSPACE',
  }
}

export interface ModelAction extends Action<string> {
  account?: AccountStateType;
  playload?: any;
};

export type TopicStateType = {
  title: string;
  workspace?: string;
}

export type WorkSpaceStateType = {
  name?: string;
  owner?: string;
  topics?: TopicStateType[];
}

export class WorkSpaceModel {
  default: WorkSpaceStateType = {
    
  }
  reducer = (state: WorkSpaceStateType, action: ModelAction) => {
    switch(action.type) {
      default:
        return state || this.default;
    }
  }
}

export type AccountStateType = {
  username: string,
  email: string
}

export class AccountModel {
  default: AccountStateType = {
    username: '',
    email: ''
  }
  reducer = (state: AccountStateType, action: ModelAction) => {
    switch(action.type) {
      case types.account.SET_ACCOUNT:
        if (action.account) {
          return {
            ...state,
            username: action.account.username,
            email: action.account.email,
          }
        }
      default: 
        return state || this.default
    }
  }

  actions = {
    load: () => async (dispatch: Dispatch) => {
      const user = await getAccount();
      if (user) {
        dispatch({
          type: types.account.SET_ACCOUNT,
          account: {
            username: user.username,
            email: user.email
          }
        })
      }
    }
  }
}

export type StateProps = {
  account: AccountStateType,
}


const account = new AccountModel();

const store = createStore(combineReducers({
  account: account.reducer,
}), applyMiddleware(reduxThunk))

export const actions = bindActionCreators({
  loadAccount: account.actions.load,
}, store.dispatch)

export default store;