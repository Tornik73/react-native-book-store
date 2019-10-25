import { AuthActionEnum } from '../../shared/enums/'
import { AuthReducerState, UserModel } from '../../../app/shared/model';
import { LoginActionTypes } from 'src/app/shared/model/auth/auth-action.model';
import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorageEnum } from '../../shared/enums/';

const jwt = require('jwt-decode');

const INIT_STATE: AuthReducerState = {
    isLogined: false,
    isLoading: false,
    userState: {
        id: null,
        email: '',
        name: '',
        lastname: '',
        username: '',
        telephone: '',
        age: null,
        country: '',
        gender: '',
        isAdmin: false,
        img: '',
    },
}

export default function authReducer(state = INIT_STATE, action: LoginActionTypes ) {
    switch (action.type) {
        case AuthActionEnum.LOGIN_EMAIL_REQUEST: {
            return {
                ...state,
            }
        }
        case AuthActionEnum.LOGIN_SUCCESS:

            const USER: UserModel = jwt(action.data.token);
            AsyncStorage.setItem(AsyncStorageEnum.TOKEN, action.data.token);
            AsyncStorage.setItem(AsyncStorageEnum.IMG, action.data.img);
            USER.img = action.data.img;

            return {
                ...state,
                isLogined: true,
                userState: USER,
            }
        case AuthActionEnum.LOGIN_FAILED:
            return {
                ...state,
                error: action.error,
                isLogined: false
            }

        case AuthActionEnum.LOGOUT:

            AsyncStorage.removeItem(AsyncStorageEnum.TOKEN);
            AsyncStorage.removeItem(AsyncStorageEnum.IMG);

            return {
                ...state,
                isLogined: false
            }
        case AuthActionEnum.LOADING_START:
            return {
                ...state,
                isLoading: true
            }
        case AuthActionEnum.LOADING_END:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }

}