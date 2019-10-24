import { combineReducers, createStore } from "redux";
import homeReducer from './home.reducer';
import authReducer from './auth.reducer'
import profileReducer from './profile.reducer'
import chatReducer from './chat.reducer';


export const reducers = combineReducers({
    homeReducer,
    authReducer,
    profileReducer,
    chatReducer
});

export default reducers;

