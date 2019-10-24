import { AccountService } from "../../services/account.service"
import { environment } from "../../environments/environment"
import {action} from 'typesafe-actions';
import { AuthActionEnum, UserActionsEnum } from "../../shared/enums/"
import LoginRequestSagaModel from "src/app/shared/model/auth/auth-saga.model";


export const loginRequest = () => {
    return {
        type: AuthActionEnum.LOGIN_EMAIL_REQUEST, 
        ...environment.hardcodeData
    }
};
export function loginSuccess() {
    return {
        type: AuthActionEnum.LOGIN_SUCCESS,
    }
}

export function loginFailed(error: any) {
    return {
        error: error,
        type: AuthActionEnum.LOGIN_FAILED,
    }
}

export function endLoading() {
    return {
        type: AuthActionEnum.LOADING_END,
    }
}

export function startLoading() {
    return {
        type: AuthActionEnum.LOADING_START,
    }
}
export function logout() {
    return async (dispatch: any) => {
        await AccountService.
            logout()
            .then(() => dispatch(logoutSuccess()))
            .then(() => dispatch(profileClearImage()))
            .catch((err:any) => console.error(err))
    }
}

export function profileClearImage() {
    return {
        type: UserActionsEnum.PROFILE_LOGOUT_CLEAR_IMAGE
    }
}
export function logoutSuccess() {
    return {
        type: AuthActionEnum.LOGOUT
    }
}