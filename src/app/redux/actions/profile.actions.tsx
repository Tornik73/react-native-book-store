import { UserActionsEnum } from "../../shared/enums/";
import { UserModel } from "src/app/shared/model";
import { PutUserError } from "src/app/shared/model/user/user-profile.models";

export function updateUserRequest(user: UserModel) {
    return {
        type: UserActionsEnum.PUT_USER_REQUEST, 
        ...user
    }
}

export function putUserSuccess(img: string = '') {

    return {
        img: img,
        type: UserActionsEnum.PUT_USER_SUCCESS,
    }
}
export function putUserFailed(error: PutUserError | string) {
    return {
        error: error,
        type: UserActionsEnum.PUT_USER_FAILED,
    }
}

export function profileImageChanged(img: string = '') {
    return {
        img: img,
        type: UserActionsEnum.PROFILE_IMAGE_CHANGED
    }
}

export function profileClearImage() {
    return {
        type: UserActionsEnum.PROFILE_LOGOUT_CLEAR_IMAGE
    }
}
