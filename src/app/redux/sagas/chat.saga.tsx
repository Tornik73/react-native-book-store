import { ChatActionsEnum } from "../../../app/shared/enums";
import { takeEvery, all, fork, call, put } from "@redux-saga/core/effects";
import { SendedChatMessage, ChatMessageResponse } from "src/app/shared/model";
import { sendMessageSuccess, sendMessageFailed } from "../actions/chat.actions";
import { ChatService } from "../../../app/services";

export function* handleChatRequest(sendedMessage: SendedChatMessage) {

    try {
        const response: ChatMessageResponse = yield call(ChatService.sendMessage, sendedMessage);

        if(response.success){
            sendedMessage.id = response.messageId;
            yield put(sendMessageSuccess(sendedMessage));
        } else {

            yield put(sendMessageFailed(response.message, sendedMessage));
        }
    } catch(err) {
        if (err instanceof Error) {
            yield put(sendMessageFailed(err.stack!, sendedMessage));
        } else {
            yield put(sendMessageFailed('An unknown error occured.', sendedMessage));
        }
    }
}


function* watchLoginReqest() {
    yield takeEvery(ChatActionsEnum.SEND_MESSAGE_REQUEST, handleChatRequest);
}

function* ChatSaga() {
    yield all([fork(watchLoginReqest)])
}

export default ChatSaga;