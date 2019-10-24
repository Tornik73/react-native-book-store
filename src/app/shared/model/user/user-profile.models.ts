import { UserModel } from "./user.model";

export interface PutUserSuccess {
    success: boolean,
    message: string,
    data: UserModel | null,
}
export interface PutUserError {
    statusCode: number,
    error: string,
    message: string
}