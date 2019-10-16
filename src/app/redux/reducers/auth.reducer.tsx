import { AuthActionEnum } from '../../shared/enums/'

const INIT_STATE = {
    isLogined: false,
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

        default:
            return state
    }

}