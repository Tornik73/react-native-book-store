import { combineReducers, createStore } from "redux";
import authReducer from './auth.reducer'
import profileReducer from './profile.reducer'
import chatReducer from './chat.reducer';
import booksReducer from './books.reducer';


export const reducers = combineReducers({
    booksReducer,
    authReducer,
    profileReducer,
    chatReducer
});

export default reducers;

