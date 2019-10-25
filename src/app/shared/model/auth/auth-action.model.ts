import { AuthActionEnum } from "../../enums"
import { LoginSuccess, LoginError } from "./login.model"

interface LoginRequestAction {
    type: typeof AuthActionEnum.LOGIN_EMAIL_REQUEST, 
}
  
interface LoginSuccessAction {
    data: LoginSuccess,
    type: typeof AuthActionEnum.LOGIN_SUCCESS,
    error: boolean,
}

interface LoginFailedAction {
    error: LoginError | string,
    type: typeof AuthActionEnum.LOGIN_FAILED,
}

interface LogoutAction {
    type: typeof AuthActionEnum.LOGOUT,
}

interface LoadingStart {
    type: typeof AuthActionEnum.LOADING_START,
}

interface LoadingEnd {
    type: typeof AuthActionEnum.LOADING_END,
}

export type LoginActionTypes = 
LoginSuccessAction | 
LoginRequestAction | 
LoginFailedAction  | 
LoadingStart       |
LoadingEnd         |
LogoutAction;

