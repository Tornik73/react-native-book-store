
import React, { Component } from 'react';
import { AuthorsBooksModel, ChatMessageResponse, SendedChatMessage, ChatMessageModel } from '../shared/model';
import { environment } from '../environments/environment';
import Axios from 'axios';

interface Props {}
interface State {}

export class ChatService extends Component<Props, State> {
    public static async sendMessage(sendedMessage: SendedChatMessage): Promise<any> {
            return await Axios.post<SendedChatMessage>(`${environment.apiUrl}chat/`, {...sendedMessage})

    }
}