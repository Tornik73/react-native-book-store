import { AuthActionEnum } from '../../shared/enums/'

const INIT_STATE = {
    isLogined: false,
    isLoading: false,
}

export default function authReducer(state = INIT_STATE, action: any) {
    switch (action.type) {
        case AuthActionEnum.LOGIN_SUCCESS:
            return {
                ...state,
                isLogined: true
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