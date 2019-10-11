import { AccountService } from "../../services/account.service"
import { environment } from "../../environments/environment"
import { AuthActionEnum } from "../../shared/enums/"

export function login() {
    return async (dispatch: any) => {
        await AccountService.
            login(environment.hardcodeData.login, environment.hardcodeData.password).
            then((response) => dispatch(loginSuccess())).
            catch((err) => console.log(err));
    }
}

export function loginSuccess() {
    return {
        type: AuthActionEnum.LOGIN_SUCCESS,
    }
}

export function logout() {
    return async (dispatch: any) => {
        await AccountService.
            logout().
            then(() => dispatch(logoutSuccess())).
            catch((err) => console.log(err))
    }
}

export function logoutSuccess() {
    return {
        type: AuthActionEnum.LOGOUT
    }
}