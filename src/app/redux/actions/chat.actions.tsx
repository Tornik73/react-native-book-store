import { ChatActionsEnum } from "../../shared/enums/";
import { SendedChatMessage } from "../../shared/model";

export function sendMessage(sendedMessage: SendedChatMessage) {
    return {
        type: ChatActionsEnum.SEND_MESSAGE_REQUEST,
        ...sendedMessage
    }
}
export function sendMessageSuccess(response: SendedChatMessage) {
    return {
        receivedMessage: response,
        type: ChatActionsEnum.SEND_MESSAGE_SUCCESS,
    }
}

export function sendMessageFailed(err: any = null, sendedMessage: SendedChatMessage) {
    return {
        sendedMessage: sendedMessage,
        error: err,
        type: ChatActionsEnum.SEND_MESSAGE_FAILED,
    }
}

export function clearUnReceivedMessageState() {
    return {
        type: ChatActionsEnum.CLEAR_UNRECEIVED_MESSAGE_STATE,
    }
}
