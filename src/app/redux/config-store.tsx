import { createStore, applyMiddleware } from 'redux';
import {reducers} from './reducers';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({});

const rootReducer = (state: any, action: any) => {
    return reducers(state, action)
}

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;