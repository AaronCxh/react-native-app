import {SET_USER} from '@/actions/user';

function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
}

function mylogin(state = false, action) { 
  switch (action.type) {
    case SET_USER:
      return action.mylogin;
    default:
      return state;
  }
}

export default {
  user,
  mylogin,
}; 
