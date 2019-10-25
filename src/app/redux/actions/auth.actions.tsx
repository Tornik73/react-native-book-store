import { environment } from "../../environments/environment";
import { AuthActionEnum } from "../../shared/enums/";
import { LoginError } from "src/app/shared/model/auth/login.model";
import { LoginActionTypes } from "src/app/shared/model/auth/auth-action.model";

export const loginRequest = (): LoginActionTypes => {
    return {
        type: AuthActionEnum.LOGIN_EMAIL_REQUEST, 
        ...environment.hardcodeData
    }
};

export function loginSuccess(imgFromSaga: string, tokenFromSaga: string): LoginActionTypes {
    return {
        data: {
            img: imgFromSaga,
            token: tokenFromSaga
        },
        type: AuthActionEnum.LOGIN_SUCCESS,
        error: false
    }
}

export function loginFailed(ErrorFromSaga: LoginError | string): LoginActionTypes {
    return {
        error: ErrorFromSaga,
        type: AuthActionEnum.LOGIN_FAILED,
    }
}

export function endLoading(): LoginActionTypes {
    return {
        type: AuthActionEnum.LOADING_END,
    }
}

export function startLoading(): LoginActionTypes {
    return {
        type: AuthActionEnum.LOADING_START,
    }
}
export function logout(): LoginActionTypes {
    return {
        type: AuthActionEnum.LOGOUT,
    }
}
