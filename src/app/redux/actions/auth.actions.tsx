import { AccountService } from "../../services/account.service"
import { environment } from "../../environments/environment"
import { AuthActionEnum, UserActionsEnum } from "../../shared/enums/"

export function login() {
    return async (dispatch: any) => {
        await AccountService.
            login(environment.hardcodeData.login, environment.hardcodeData.password)
            .then((response) => dispatch(loginSuccess(response.img))).
            catch((err) => console.log(err));
    }
}
export function loginSuccess(img: string) {
    return {
        img: img,
        type: AuthActionEnum.LOGIN_SUCCESS,
    }
}

export function loadingStart() {
    return async (dispatch: any) => {
             dispatch(startLoading())
    }
}
export function loadingEnd() {
    return async (dispatch: any) => {
             dispatch(endLoading())
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
            .catch((err:any) => console.log(err))
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