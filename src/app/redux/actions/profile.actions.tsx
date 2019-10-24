import { AccountService } from "../../services/account.service";
import { UserActionsEnum } from "../../shared/enums/";
import { UserModel } from "src/app/shared/model";
import { PutUserError } from "src/app/shared/model/user/user-profile.models";
import AsyncStorage from "@react-native-community/async-storage";

export function updateUserRequest(user: UserModel) {
    return {
        type: UserActionsEnum.PUT_USER_REQUEST, 
        ...user
    }
}

export function putUserSuccess(img: string = '') {
    profileImageChanged(img);
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

export function profileImageChanged(img: string = '') {
    return {
        img: img,
        type: UserActionsEnum.PROFILE_IMAGE_CHANGED
    }
}
