import { ChatMessageModel } from "./chat-message.model";

export interface ChatReducerState {
    renderedChatMessages: ChatMessageModel[];
    unResolvedPromises: ChatMessageModel[];
    messagesToRender: ChatMessageModel[];
}