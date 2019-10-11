import { combineReducers, createStore } from "redux";
import homeReducer from './home.reducer';
import authReducer from './auth.reducer'


export const reducers = combineReducers({
    homeReducer,
    authReducer
});

export default reducers;

