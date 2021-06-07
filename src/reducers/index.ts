import {combineReducers, AnyAction} from 'redux';
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from '../actions';

function selectedSubreddit(state = 'reactjs', action: AnyAction) {
  console.log('=====selectedSubreddit=====');
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: true,
    items: [],
    length: 0,
  },
  action: AnyAction,
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true,
        isFetching: false,
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        length: action.posts.length,
        lastUpdated: action.receivedAt,
      });
    default:
      // console.log('default', state);
      return state;
  }
}

function postsBySubreddit(state: any = {}, action: AnyAction) {
  console.log('=====postsBySubreddit=====', action.type);
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action),
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
});

export default rootReducer;
/* export const loginStatus = (
  prevState = {isLoading: true, isSignout: false, userToken: null},
  action: AnyAction,
) => {
  console.log('loginStatusreducer', prevState, action.type);
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
    default:
      return {
        ...prevState,
        isSignout: true,
        userToken: action.token,
      };
  }
}; */

// export const store: Store = createStore(
//   combineReducers({count: counter, loginStatus}),
// );
