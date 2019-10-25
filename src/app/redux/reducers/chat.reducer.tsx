import { ChatActionsEnum } from "../../shared/enums";
import { ChatReducerState } from "src/app/shared/model";

const INIT_STATE: ChatReducerState = {
    renderedChatMessages: [
            {
                id: 1,
                uuid: null,
                name: 'Alberto Raya',
                messageText: 'Hi, how are you guys?',
                time: '2:16PM',
                isRead: true,
                isReceived: true,
                date: '05.08.2018',
            }, 
            {
                id: 2,
                uuid: null,
                name: 'Dameon Peterson',
                messageText: 'I’m doing great! Working hard on the TeamUp app',
                time: '2:16PM',
                isRead: true,
                isReceived: true,
                date: '05.08.2018'
            }, 
            {
                id: 3,
                uuid: null,
                name: 'Alberto Raya',
                messageText: 'Hi, how are you guys?',
                time: '2:16PM',
                isRead: true,
                isReceived: true,
                date: '05.08.2018'
            },
            {
                id: 4,
                uuid: null,
                name: 'LoginName',
                messageText: 'It’s not finished yet?',
                time: '2:16PM',
                isRead: true,
                isReceived: true,
                date: '05.08.2018'
            },
            {
                id: 5,
                uuid: null,
                name: 'Darren Adams',
                messageText: 'I’m doing great! Working hard on the TeamUp app',
                time: '2:16PM',
                isRead: true,
                isReceived: true,
                date: '06.08.2018'
            },
            {
                id: 6,
                uuid: null,
                name: 'Seri Anand',
                messageText: 'I’m doing great! Working hard on the TeamUp app',
                time: '2:16PM',
                isRead: true,
                isReceived: true,
                date: '06.08.2018'
            },
            {
                id: 7,
                uuid: null,
                name: 'Cha Ji-Hun',
                messageText: 'Hi, how are you guys?',
                time: '2:16PM',
                isRead: true,
                isReceived: true,
                date: '06.08.2018'
            },
            {
                id: 8,
                uuid: null,
                name: 'LoginName',
                messageText: 'It’s not finished yet?',
                time: '2:16PM',
                isRead: true,
                isReceived: true,
                date: '06.08.2018'
            },
            {
                id: 9,
                uuid: null,
                name: 'LoginName',
                messageText: 'It’s not finished yet?',
                time: '2:16PM',
                isRead: true,
                isReceived: true,
                date: '06.08.2018'
            },
            {
                id: 10,
                uuid: null,
                name: 'LoginName',
                messageText: 'It’s not finished yet?',
                time: '2:17PM',
                isRead: true,
                isReceived: true,
                date: '07.08.2018'
            },
            {
                id: 11,
                uuid: null,
                name: 'LoginName',
                messageText: 'It’s not finished yet?',
                time: '2:18PM',
                isRead: true,
                isReceived: true,
                date: '07.08.2018'
            },
            {
                id: 12,
                uuid: null,
                name: 'LoginName',
                messageText: 'It’s not finished yet?',
                time: '2:25PM',
                isRead: true,
                isReceived: true,
                date: '08.08.2018'
            },
    ],
    messagesToRender: [],
    unResolvedPromises: [],
}

export default function chatReducer(state = INIT_STATE, action: any) {
    // console.log(action);
    console.log(action.type, state.unResolvedPromises);
        switch (action.type) {
            case ChatActionsEnum.SEND_MESSAGE_REQUEST:
                    let flag = false;
                    state.renderedChatMessages.forEach(item => {
                        if(item.uuid === action.uuid){
                            flag = true;
                        }
                    });
                    if(!flag) {
                        state.renderedChatMessages.push(action);
                    }
                    flag = true;
                    return {
                        ...state,
                    }
            case ChatActionsEnum.SEND_MESSAGE_SUCCESS:
                state.renderedChatMessages.forEach(item => {
                    if(item.uuid === action.receivedMessage.uuid){
                            item.isReceived = true;
                    }
                })
                return {
                    ...state,
                }
            case ChatActionsEnum.SEND_MESSAGE_FAILED:
                state.unResolvedPromises.push(action.sendedMessage);
                return {
                    error: action.error,
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