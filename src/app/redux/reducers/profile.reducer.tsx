import { AuthActionEnum, UserActionsEnum } from '../../shared/enums/';

const INIT_STATE = {
    profileImg: ''
}

export default function profileReducer(state = INIT_STATE, action: any) {

    switch (action.type) {
        case UserActionsEnum.PUT_USER_SUCCESS:
            return {
                ...state,
            }
        case UserActionsEnum.PUT_USER_FAILED:
            return {
                ...state,
            }
        case UserActionsEnum.PROFILE_IMAGE_CHANGED: 
            state.profileImg = action.profileImg;
            return {
                ...state,
            }
        case UserActionsEnum.PROFILE_LOGOUT_CLEAR_IMAGE: 
            state.profileImg = '';
            return {
                ...state,
            }
        default: 
            return state
    }

}