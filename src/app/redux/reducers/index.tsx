import { combineReducers, createStore } from "redux";
import homeReducer from './home.reducer';
import authReducer from './auth.reducer'
import profileReducer from './profile.reducer'
import chatReducer from './chat.reducer';


export const reducers = combineReducers({
    homeReducer,
    profileReducer,
    authReducer,
    chatReducer
});

export default reducers;

