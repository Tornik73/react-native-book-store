import styles from './styles';
import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput, Text, Image } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams, ScrollView, FlatList } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DotIndicator } from '../../components/DotIndicators/index';
import { ToastAndroid } from 'react-native';
import { ChatMessageModel, SendedChatMessage, ChatMessageResponse, ChatReducerState } from '../../shared/model/';
import { connect } from 'react-redux';
import * as chatActions from '../../redux/actions/chat.actions';
import UUIDGenerator from 'react-native-uuid-generator';
import NetInfo from "@react-native-community/netinfo";

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    postMessage: (sendedChatMessage: SendedChatMessage) => ChatMessageModel;
    clearState: () => void;
    unRecievedMessages: ChatMessageModel[];
    renderedChatMessages: ChatMessageModel[];
}

interface State {
    sendingMessage: boolean;
    renderMessages: ChatMessageModel[];
    refresh: boolean;
}

interface mapStateToPropsModel {
    chatReducer: ChatReducerState;
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
            refresh: false,
            sendingMessage: false,
            renderMessages: []
        };
    }

    componentDidMount(){
        this.subscribeToNetworkState();
        //TODO: this.unSubscribeFromNetworkState();
    }
    private sendMessage = (): void => {

        // Change status when message will recieved
        UUIDGenerator.getRandomUUID((uuid) => {
            chatMessage.uuid = uuid;
            chatMessage.messageText = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            // this.pushMessageToState(chatMessage);
            this.props.postMessage(chatMessage);
        });
        this.setState({ 
            refresh: !this.state.refresh
        });

        //TODO: scroll to end need to be async
        setTimeout(() => {
            this.scroll.props.scrollToEnd(true);
            this.setState({ 
                refresh: !this.state.refresh
            });
        }, 200)

        // Change status when message will read
    }

    private subscribeToNetworkState = (): void => {
        NetInfo.addEventListener(state => {
            if(!state.isConnected){
                ToastAndroid.show('Connection to the server is lost!', ToastAndroid.SHORT);
            } 
            if(state.isConnected){
                if(this.props.unRecievedMessages.length > 0){
                    this.props.unRecievedMessages.forEach(item => {
                            this.props.postMessage(item);
                    });
                    this.setState({ 
                        refresh: !this.state.refresh
                    });
                    // BUG: On 1 more messages in unRecievedMessages
                }
            }
        });
    }

    public render() {
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
                        data={this.props.renderedChatMessages}
                        extraData={this.state.refresh}
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

const mapDispatchToProps = {
    postMessage: (chatMessage: SendedChatMessage) => chatActions.sendMessage(chatMessage),
    clearState: () => chatActions.clearState() 
};

const mapStateToProps = (state: mapStateToPropsModel) => {
    return {
        renderedChatMessages: state.chatReducer.renderedChatMessages,
        unRecievedMessages: state.chatReducer.unResolvedPromises,
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatScreen)
  