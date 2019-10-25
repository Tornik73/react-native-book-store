import { UserModel } from "../user/user.model";

export interface AuthReducerState {
    isLogined: boolean,
    isLoading: boolean,
    error?: boolean,
    userState: UserModel,
}