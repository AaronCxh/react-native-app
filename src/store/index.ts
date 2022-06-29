import rootReducer from '../reducers';
import {
  legacy_createStore as createStore,
  Store,
  applyMiddleware,
  AnyAction,
} from 'redux';
// import { configureStore, combineReducers } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk';

function logger({getState}: any) {
  return (next: any) => (action: AnyAction) => {
    console.log('will dispatch', action.type, action.receivedAt);

    let returnValue = next(action);

    console.log('state after dispath', getState());

    return returnValue;
  };
}

function configureStore(preloadedState: any = undefined): Store {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, logger),
  );
}

export default configureStore();
