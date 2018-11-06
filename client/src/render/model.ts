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
import { all as allWorkspaces } from '../ops/workspace';

export const types = {
  account: {
    SET_ACCOUNT: 'SET_ACCOUNT',
  },
  workspaceList: {
    INIT: 'INIT_WORKSPACE_LIST',
    SET: 'SET_WORKSPACE_LIST',
  },
  workspace: {
    SWITCH_CURRENT_WORKSPACE: 'SWITCH_CURRENT_WORKSPACE',
  }
}

export interface ModelAction extends Action<string> {
  account?: AccountStateType;
  workspaces: ShortWorkSpaceType[];
  playload?: any;
};

export type TopicStateType = {
  title: string;
  workspace?: string;
}

/**
 * WorkSaceListModel
 */

export type ShortWorkSpaceType = {
  name?: string;
  hash?: string;
  owner?: string;
  topics?: string[];
}

 export type WorkSpaceListStateType = {
   list: ShortWorkSpaceType[]
 }

 export class WorkSaceListModel {
  default: WorkSpaceListStateType = {
    list: []
  }
  reducer = (state: WorkSpaceListStateType, action: ModelAction) => {
    switch(action.type) {
      case types.workspaceList.INIT:
        return { ...state, ...this.default }
      case types.workspaceList.SET:
        return { ...state, list: action.workspaces }
      default:
        return state || this.default;
    }
  }
  acions = {
    load: () => async (dispatch: Dispatch) => {
      const ws = await allWorkspaces()
      dispatch({
        type: types.workspaceList.SET,
        workspaces: ws,
      })
    }
  }
 }

/**
 * WorkspaceModel
 */

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


/**
 * AccountModel
 */
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

/**
 * sumary
 */

export type StateProps = {
  account: AccountStateType,
  workspaces: WorkSpaceListStateType,
}

const workspaces = new WorkSaceListModel();
const account = new AccountModel();

const store = createStore(combineReducers({
  workspaces: workspaces.reducer,
  account: account.reducer,
}), applyMiddleware(reduxThunk))

export const actions = bindActionCreators({
  loadAccount: account.actions.load,
  loadWorkspaces: workspaces.acions.load,
}, store.dispatch)

export default store;