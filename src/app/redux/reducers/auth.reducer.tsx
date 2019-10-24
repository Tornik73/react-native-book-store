import { AuthActionEnum } from '../../shared/enums/'
import { AuthReducerState } from '../../../app/shared/model';

const INIT_STATE: AuthReducerState = {
    isLogined: false,
    isLoading: false,
    // error: false
}

export default function authReducer(state = INIT_STATE, action: any) {
    switch (action.type) {
        case AuthActionEnum.LOGIN_EMAIL_REQUEST: {
            return {
                ...state,
            }
        }
        case AuthActionEnum.LOGIN_SUCCESS:
            return {
                ...state,
                isLogined: true
            }
        case AuthActionEnum.LOGIN_FAILED:
            return {
                ...state,
                error: action.error,
                isLogined: false
            }

        case AuthActionEnum.LOGOUT:
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