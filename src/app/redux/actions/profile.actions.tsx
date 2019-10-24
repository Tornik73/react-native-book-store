import { AccountService } from "../../services/account.service";
import { UserActionsEnum } from "../../shared/enums/";
import { UserModel } from "src/app/shared/model";
import { PutUserError } from "src/app/shared/model/user/user-profile.models";

export function updateUserRequest(user: UserModel) {
    return {
        type: UserActionsEnum.PUT_USER_REQUEST, 
        ...user
    }
}

export function putUserSuccess() {
    return {
        type: UserActionsEnum.PUT_USER_SUCCESS,
    }
}
export function putUserFailed(error: PutUserError | string) {
    return {
        error: error,
        type: UserActionsEnum.PUT_USER_FAILED,
    }
}

export function profileImageChanged() {
    return {
        type: UserActionsEnum.PROFILE_IMAGE_CHANGED
    }
}

// export function updateProfileImage (newFooterImg: string) {
//     return (dispatch: any) => {
//             dispatch(profileImageChanged(newFooterImg));
//     }
// }
