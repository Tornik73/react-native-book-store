import styles from './styles';
import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput, Text, Image } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams, ScrollView, FlatList } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DotIndicator } from '../../components/DotIndicators/index';
import { ToastAndroid } from 'react-native';
import { ChatMessageModel, SendedChatMessage, ChatMessageResponse } from '../../shared/model/';
import { connect } from 'react-redux';
import * as chatActions from '../../redux/actions/chat.actions';
import UUIDGenerator from 'react-native-uuid-generator';
import NetInfo from "@react-native-community/netinfo";

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    postMessage: (sendedChatMessage: SendedChatMessage) => Promise<ChatMessageResponse>;
    clearState: () => void;
    unRecievedMessages: [];
}

interface State {
    sendingMessage: boolean;
    renderMessages: ChatMessageModel[];

}

const chatMessage: SendedChatMessage = {
    id: null,
    uuid: null,
    name: 'LoginName',
    isRead: false,
    isReceived: false,
    messageText: 'Bla bla',
    time: '2:25PM',
    date: '09.08.2018'
}; // TODO: REMOVE


class ChatScreen extends Component<Props, State> {  
    private oldDate: string;
    private scroll: any;

    constructor(props: Props){
        super(props);
        this.oldDate = '';
        this.state = {
            sendingMessage: false,
            renderMessages: [
                {
                    id: 1,
                    name: 'Alberto Raya',
                    messageText: 'Hi, how are you guys?',
                    time: '2:16PM',
                    isRead: true,
                    isReceived: true,
                    date: '05.08.2018',
                }, 
                {
                    id: 2,
                    name: 'Dameon Peterson',
                    messageText: 'I’m doing great! Working hard on the TeamUp app',
                    time: '2:16PM',
                    isRead: true,
                    isReceived: true,
                    date: '05.08.2018'
                }, 
                {
                    id: 3,
                    name: 'Alberto Raya',
                    messageText: 'Hi, how are you guys?',
                    time: '2:16PM',
                    isRead: true,
                    isReceived: true,
                    date: '05.08.2018'
                },
                {
                    id: 4,
                    name: 'LoginName',
                    messageText: 'It’s not finished yet?',
                    time: '2:16PM',
                    isRead: true,
                    isReceived: true,
                    date: '05.08.2018'
                },
                {
                    id: 5,
                    name: 'Darren Adams',
                    messageText: 'I’m doing great! Working hard on the TeamUp app',
                    time: '2:16PM',
                    isRead: true,
                    isReceived: true,
                    date: '06.08.2018'
                },
                {
                    id: 6,
                    name: 'Seri Anand',
                    messageText: 'I’m doing great! Working hard on the TeamUp app',
                    time: '2:16PM',
                    isRead: true,
                    isReceived: true,
                    date: '06.08.2018'
                },
                {
                    id: 7,
                    name: 'Cha Ji-Hun',
                    messageText: 'Hi, how are you guys?',
                    time: '2:16PM',
                    isRead: true,
                    isReceived: true,
                    date: '06.08.2018'
                },
                {
                    id: 8,
                    name: 'LoginName',
                    messageText: 'It’s not finished yet?',
                    time: '2:16PM',
                    isRead: true,
                    isReceived: true,
                    date: '06.08.2018'
                },
                {
                    id: 9,
                    name: 'LoginName',
                    messageText: 'It’s not finished yet?',
                    time: '2:16PM',
                    isRead: true,
                    isReceived: true,
                    date: '06.08.2018'
                },
                {
                    id: 10,
                    name: 'LoginName',
                    messageText: 'It’s not finished yet?',
                    time: '2:17PM',
                    isRead: true,
                    isReceived: true,
                    date: '07.08.2018'
                },
                {
                    id: 11,
                    name: 'LoginName',
                    messageText: 'It’s not finished yet?',
                    time: '2:18PM',
                    isRead: true,
                    isReceived: true,
                    date: '07.08.2018'
                },
                {
                    id: 12,
                    name: 'LoginName',
                    messageText: 'It’s not finished yet?',
                    time: '2:25PM',
                    isRead: true,
                    isReceived: true,
                    date: '08.08.2018'
                },
            ]
        };
    }

    private pushMessageToState = (message:  SendedChatMessage, id: number | null = null): void => {
        this.setState((state: State): State => {
            const renderMessages = [...state.renderMessages];
            message.id = id;
            renderMessages.push({...message});
            return {
                renderMessages,
                sendingMessage: state.sendingMessage
            };
        });
    }

    private changeMessageStatusToRecievedByUUID = (id: number, uuid: string | null = null): void => {
        setTimeout(()=> { // TODO: REMOVE 
            this.setState((state: State): State => {

                const renderMessages = [...state.renderMessages];
                renderMessages.forEach(item => {

                    if(item.uuid === uuid){

                        item.id = id;
                        item.isReceived = true;
                    }
                    // console.log(item);
                })
                return {
                    renderMessages,
                    sendingMessage: state.sendingMessage
                };

            });
        }, 1000);
    }
    private postMessage = (chatMessage: SendedChatMessage) :void => {
        this.props.postMessage(chatMessage)
        .then(response => { 
            // console.log(response);
            this.scroll.props.scrollToEnd(true); 
            this.changeMessageStatusToRecievedByUUID(response.messageId, response.uuid);
        })
        .catch(err => {
            console.log(err, 'err');

        });
    }

    private sendMessage = (): void => {

        // Change status when message will recieved
        UUIDGenerator.getRandomUUID((uuid) => {
            chatMessage.uuid = uuid;
            this.pushMessageToState(chatMessage);
            this.postMessage(chatMessage);
        });

        // Change status when message will read
    }
    

    public render() {
        // Subscribe
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Is connected?", state.isConnected);
            if(!state.isConnected){
                ToastAndroid.show('Connection to the server is lost!', ToastAndroid.SHORT);
            } 
            if(state.isConnected){
                if(this.props.unRecievedMessages.length > 0){
                    console.log(this.props.unRecievedMessages.length)
                    this.props.unRecievedMessages.forEach(item => {
                            this.postMessage(item);
                    })
                    this.props.clearState();
                }
            }
        });

        return(
            <View>
                <KeyboardAwareScrollView  style={ styles.chatContainer } 
                innerRef={ref => {
                    this.scroll = ref
                }}
                >              
                <ScrollView >
                    <FlatList
                        horizontal={false}
                        data={this.state.renderMessages}
                        renderItem={(item) => this.renderChatMessage(item.item, item.index)}
                    >
                    </FlatList>
                    {this.state.sendingMessage ? (
                        <View style={styles.sendingMessage}>
                            <View style={styles.arrowLeft}></View>
                                <View style={styles.sendingMessageIndicator}>
                                        <DotIndicator color='rgb(62, 74, 89)' size={6} count={3}/>
                                </View>
                        </View>

                    ): ( <View></View>)}
                </ScrollView> 
            </KeyboardAwareScrollView>
            <View  style={styles.inputMessageField}>
                <View style={styles.inputField}>
                    <TouchableOpacity>
                        <Image style={styles.voiceImg} source={require('../../../assets/img/png/chat/voice.png')}></Image>
                    </TouchableOpacity> 
                    <TextInput style={styles.input} placeholderTextColor = 'rgb(62, 74, 89)' placeholder={"Type your message…"}>
                    </TextInput>
                </View>
                <TouchableOpacity onPress={() => {this.sendMessage()}}>
                    <View style={styles.sendMessage}>
                        <Image style={styles.sendMessageImg} source={require('../../../assets/img/png/chat/sendIcon.png')}></Image> 
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        )
    }

    private setNewDate = (newDate: string): void => {
        this.oldDate = newDate; // TODO: REMOVE!
    }

    private renderChatMessage = (item: ChatMessageModel, index: number) => {
        let flag = false;

        if(index > 0){
            if(this.oldDate !== item.date){
                this.setNewDate(item.date);
                flag = true;
            }
        } else if (index === 0) {
            this.setNewDate(item.date);
            flag = true;
        }

        return (
            <View style={styles.chatMessage}>
                {flag === true ? (<Text style={styles.centerDate}>{item.date}</Text>) : (null)}
                {item.name !== 'LoginName' ? ( // TODO: Remove LoginName
                    <View style={styles.receivedMessageArrow}>

                            <View style={styles.arrowLeft}></View>
                            <View style={styles.receivedMessage}>

                                <Text style={styles.messageItemName}>{item.name}</Text>
                                <Text style={styles.messageItemText}>{item.messageText}</Text>
                                <Text style={styles.messageItemTime}>{item.time}</Text>
                            </View>
                    </View>
                ) : ( 
                    <View style={styles.sentMessageArrow}>

                        <View style={styles.sentMessage}>
                            <View>
                                <Text style={styles.sentMessageItemText}>{item.messageText}</Text>
                            </View>
                            {item.isReceived && !item.isRead ? (
                                <View style={styles.sentMessageStatus}>
                                    <View style={styles.recievedChecked}>
                                        <Image style={styles.sentMessageStatusImg} source={require('../../../assets/img/png/chat/checkWhite.png')} />
                                    </View>
                                </View>
                            ) : (
                                <View></View>
                            )}
                            {item.isReceived && item.isRead ? (
                                <View style={styles.sentMessageStatus}>
                                    <Image style={styles.sentMessageStatusImg} source={require('../../../assets/img/png/chat/checkWhite.png')} />
                                    <View style={styles.recievedChecked}>
                                        <Image style={styles.sentMessageStatusImg} source={require('../../../assets/img/png/chat/checkWhite.png')} />
                                    </View>
                                </View>
                            ) : (
                                <View></View>
                            )}
                            {!item.isReceived ? (
                                <View style={styles.sentMessageStatus}>
                                    <View style={styles.recievedChecked}>
                                        <Image style={styles.timeIcon} source={require('../../../assets/img/png/chat/time.png')} />
                                    </View>
                                </View>
                            ):(<View></View>)}
                        </View>
                        <View style={styles.arrowRight}></View>
                    </View>
                )}
            </View>
        )
    }
}



const mapDispatchToProps = (dispatch: any) => ({
    postMessage: (chatMessage: SendedChatMessage) => dispatch(chatActions.sendMessage(chatMessage)),
    clearState: () => dispatch(chatActions.clearState()) 
});
const mapStateToProps = (state: any) => {
    return {
        unRecievedMessages: state.chatReducer.unResolvedPromises,
    }
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatScreen)
  