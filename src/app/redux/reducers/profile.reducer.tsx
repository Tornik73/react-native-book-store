import { AuthActionEnum, UserActionsEnum } from '../../shared/enums/';
import { ProfileReducerState } from 'src/app/shared/model';
import AsyncStorage from '@react-native-community/async-storage';

const INIT_STATE: ProfileReducerState = {
    profileImg: '',
    response: null,
    booksResponse: []
}

export default async function profileReducer(state = INIT_STATE, action: any) {
    console.log('PROFILE REDUCER', action.type);
    switch (action.type) {
        case UserActionsEnum.PUT_USER_SUCCESS:
            let img = await AsyncStorage.getItem('img');
            if(img) {
                state.profileImg = img;
            }
            return {
                ...state,
            }
        case UserActionsEnum.PUT_USER_FAILED:
            return {
                error: action.error,
                ...state,
            }
        case UserActionsEnum.PROFILE_IMAGE_CHANGED: 
            img = await AsyncStorage.getItem('img');
            if(img) {
                state.profileImg = img;
            }
            return {
                ...state,
            }
        case UserActionsEnum.PROFILE_LOGOUT_CLEAR_IMAGE: 
            state.profileImg = '';
            return {
                ...state,
            }
        case UserActionsEnum.GET_ALL_BOOKS_SUCCESS:
            state.booksResponse = action.responseToState;
            return {
                ...state,
            }
        default: 
            return state
    }

}