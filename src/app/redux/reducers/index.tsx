import { combineReducers, createStore } from "redux";
import homeReducer from './home.reducer';
import authReducer from './auth.reducer'
import profileReducer from './profile.reducer'


export const reducers = combineReducers({
    homeReducer,
    profileReducer,
    authReducer
});

export default reducers;

