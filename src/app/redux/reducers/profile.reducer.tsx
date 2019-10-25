import { UserActionsEnum } from '../../shared/enums/';
import { ProfileReducerState } from 'src/app/shared/model';

const INIT_STATE: ProfileReducerState = {
    profileImg: '',
}

export default function profileReducer(state = INIT_STATE, action: any) {
    switch (action.type) {
        case UserActionsEnum.PUT_USER_SUCCESS:
            state.profileImg = action.img;
            return {
                ...state,
            }
        case UserActionsEnum.PUT_USER_FAILED:
            return {
                error: action.error,
                ...state,
            }
        case UserActionsEnum.PROFILE_IMAGE_CHANGED:
            state.profileImg = action.img; 
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