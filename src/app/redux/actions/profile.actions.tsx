import { AccountService } from "../../services/account.service";
import { UserActionsEnum } from "../../shared/enums/";
import { UserModel } from "src/app/shared/model";

export function updateUser(user: UserModel) {
    return async (dispatch: any) => {
        await AccountService.
        putUser(user).
            then((response) => dispatch(putSuccess())).
            catch((err) => console.log(err));
    }
}

export function putSuccess() {
    return {
        type: UserActionsEnum.PUT_USER_SUCCESS,
    }
}

export function updateProfileImage (newFooterImg: string) {
    return (dispatch: any) => {
            dispatch(profileImageChanged(newFooterImg));

    }
}
export function profileImageChanged(img: string) {
    return {
        profileImg: img,
        type: UserActionsEnum.PROFILE_IMAGE_CHANGED
    }
}
