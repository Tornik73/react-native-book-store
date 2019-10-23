import { ChatActionsEnum } from "../../shared/enums";


interface InitStateModel {
    unResolvedPromises: Promise<any>[]
}

const INIT_STATE: InitStateModel = {
    unResolvedPromises: []
}

export default function chatReducer(state = INIT_STATE, action: any) {
    console.log(action.type);
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