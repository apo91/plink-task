// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';
import type { counterStateType } from '../reducers/types';
import qrRequestSaga from '../sagas/auth/qrRequestSaga';
import qrConfirmationSaga from '../sagas/auth/qrConfirmationSaga';
import authSaga from '../sagas/auth/authSaga';

const history = createHashHistory();
const router = routerMiddleware(history);
const rootReducer = createRootReducer(history);
const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(thunk, router, sagaMiddleware);

function configureStore(initialState?: any) {
  const store = createStore<*, counterStateType, *>(
    rootReducer,
    initialState,
    enhancer
  );
  sagaMiddleware.run(qrRequestSaga);
  sagaMiddleware.run(qrConfirmationSaga);
  sagaMiddleware.run(authSaga);
  return store;
}

export default { configureStore, history };
