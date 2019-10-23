import { ChatService } from "../../services/";
import { ChatActionsEnum } from "../../shared/enums/";
import { SendedChatMessage, ChatMessageResponse } from "../../shared/model";

export function sendMessage(sendedMessage: SendedChatMessage) {
    return async (dispatch: any): Promise<ChatMessageResponse> => {
        return await ChatService
            .sendMessage(sendedMessage)
                .then((response) => dispatch(sendMessageSuccess(response.data)))
                .catch((err) => {
                    dispatch(sendMessageFailed(err, sendedMessage));
                });
    }
}
export function sendMessageSuccess(response: any) {
    return {
        ...response,
        type: ChatActionsEnum.SEND_MESSAGE_SUCCESS,
    }
}

export function sendMessageFailed(err: any, sendedMessage: SendedChatMessage) {
    return {
        sendedMessage: sendedMessage,
        ...err,
        type: ChatActionsEnum.SEND_MESSAGE_FAILED,
    }
}


export function clearState() {
    return {
        type: ChatActionsEnum.CLEAR_STATE,
    }
}

