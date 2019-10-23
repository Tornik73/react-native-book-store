import { ChatActionsEnum } from "../../shared/enums";
import { ChatReducerState } from "src/app/shared/model";

const INIT_STATE: ChatReducerState = {
    unResolvedPromises: []
}

export default function chatReducer(state = INIT_STATE, action: any) {
    switch (action.type) {

        case ChatActionsEnum.SEND_MESSAGE_SUCCESS:
            return {
                ...action.response,
                ...state,
            }
        case ChatActionsEnum.SEND_MESSAGE_FAILED:
            state.unResolvedPromises.push(action.sendedMessage);
            return {
                ...action.err,
                ...state,
            }
        case ChatActionsEnum.CLEAR_STATE:
                state.unResolvedPromises = [];
                return {
                    ...state,
                }
        default:
            return state;
    }
}