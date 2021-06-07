import rootReducer from '../reducers';
import {createStore, Store, applyMiddleware, AnyAction} from 'redux';
import thunkMiddleware from 'redux-thunk';

function logger({getState}: any) {
  return (next: any) => (action: AnyAction) => {
    console.log('will dispatch', action.type, action.receivedAt);

    let returnValue = next(action);

    console.log('state after dispath', getState());

    return returnValue;
  };
}

export default function configureStore(preloadedState: any = undefined): Store {
  return createStore(
    rootReducer,
    preloadedState,
    // {
    //   postsBySubreddit: {},
    //   selectedSubreddit: 'reactjs1',
    // },
    applyMiddleware(thunkMiddleware, logger),
  );
}
// export const store: Store = createStore(rootReducer, applyMiddleware);
