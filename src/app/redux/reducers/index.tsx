import { combineReducers, createStore } from "redux";
import venueReducer from './venue.reducer';
import authReducer from './auth.reducer'


export const reducers = combineReducers({
    venueReducer,
    authReducer
});

export default reducers;

