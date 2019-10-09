import { AccountService } from "../../services/account.service"
import { environment } from "../../environments/environment"

export function login() {
    return async (dispatch: any) => {
        await AccountService.
            login(environment.hardcodeData.login, environment.hardcodeData.password).
            then(() => dispatch(loginSuccess())).
            catch((err) => console.log(err))
    }
}

export function loginSuccess() {
    return {
        type: 'LOGIN'
    }
}