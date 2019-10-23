import { ChatMessageModel } from "./chat-message.model";

export interface ChatReducerState {
    unResolvedPromises: ChatMessageModel[];
}