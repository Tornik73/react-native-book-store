import { createStore, applyMiddleware } from 'redux';
import {reducers} from './reducers';
import createSagaMiddleWare from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { all, fork } from '@redux-saga/core/effects';
import LoginSaga from './sagas/auth.saga';
import ProfileSaga from './sagas/profile.saga';
import BooksSaga from './sagas/books.saga';
import ChatSaga from './sagas/chat.saga';

const composeEnhancers = composeWithDevTools({});

const sagaMiddleware = createSagaMiddleWare();


const rootReducer = (state: any, action: any) => {
    return reducers(state, action)
}

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

export function* rootSaga() {
    yield all([
        fork(LoginSaga),
        fork(ProfileSaga),
        fork(BooksSaga),
        fork(ChatSaga)
    ])
  }

sagaMiddleware.run(rootSaga);

export default store;