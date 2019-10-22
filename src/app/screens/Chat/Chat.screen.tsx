import styles from './styles';
import React, { Component } from 'react';
import { View, SafeAreaView, Button, TouchableOpacity, TextInput, Text, Image } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams, ScrollView, FlatList } from 'react-navigation';
import { environment } from '../../environments/environment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DotIndicator } from '../../components/DotIndicators/index';
import {ToastAndroid} from 'react-native';

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
    sendingMessage: boolean;
    oldDate: object | null;
    renderMessages: any[];
}

interface mapStateToPropsModel {}

class ChatScreen extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
        sendingMessage: false,
        oldDate: null,
        renderMessages: [
            {
                name: 'Alberto Raya',
                messageText: 'Hi, how are you guys?',
                time: '2:16PM',
                isRead: true,
                date: '05.08.2018'
            }, 
            {
                name: 'Dameon Peterson',
                messageText: 'I’m doing great! Working hard on the TeamUp app',
                time: '2:16PM',
                isRead: true,
                date: '05.08.2018'
            }, 
            {
                name: 'Alberto Raya',
                messageText: 'Hi, how are you guys?',
                time: '2:16PM',
                isRead: true,
                date: '05.08.2018'
            },
            {
                name: 'LoginName',
                messageText: 'It’s not finished yet?',
                time: '2:16PM',
                isRead: true,
                date: '05.08.2018'
            },
            {
                name: 'Darren Adams',
                messageText: 'I’m doing great! Working hard on the TeamUp app',
                time: '2:16PM',
                isRead: true,
                date: '06.08.2018'
            },
            {
                name: 'Seri Anand',
                messageText: 'I’m doing great! Working hard on the TeamUp app',
                time: '2:16PM',
                isRead: true,
                date: '06.08.2018'
            },
            {
                name: 'Cha Ji-Hun',
                messageText: 'Hi, how are you guys?',
                time: '2:16PM',
                isRead: true,
                date: '06.08.2018'
            },
            {
                name: 'LoginName',
                messageText: 'It’s not finished yet?',
                time: '2:16PM',
                isRead: true,
                date: '06.08.2018'
            },
            {
                name: 'LoginName',
                messageText: 'It’s not finished yet?',
                time: '2:16PM',
                isRead: true,
                date: '06.08.2018'
            },
            {
                name: 'LoginName',
                messageText: 'It’s not finished yet?',
                time: '2:17PM',
                isRead: true,
                date: '07.08.2018'
            },
            {
                name: 'LoginName',
                messageText: 'It’s not finished yet?',
                time: '2:18PM',
                isRead: true,
                date: '07.08.2018'
            },
            {
                name: 'LoginName',
                messageText: 'It’s not finished yet?',
                time: '2:25PM',
                isRead: true,
                date: '08.08.2018'
            },
          ]
    };
  }

  oldDate: any;
  scroll: any;


  private sendMessage = () => {
        this.setState((state: State): State => {
        const renderMessages = [...state.renderMessages];
        renderMessages.push({
            name: 'LoginName',
            messageText: 'Bla bla',
            time: '2:25PM',
            isRead: true,
            date: '09.08.2018'
          },)
        return {
          renderMessages,
          oldDate: state.oldDate,
          sendingMessage: state.sendingMessage
        };
      });
      setTimeout(() => {
          this.scroll.props.scrollToEnd(true)
      }, 0);
    }
    

  public render() {
    // ToastAndroid.show('Connection to the server is lost!', ToastAndroid.SHORT);
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

setNewDate = (newDate) => {
    this.state.oldDate = newDate; // TODO: REMOVE!
}
renderChatMessage = (item, index) => {
    debugger;
    let flag = false;

    if(index > 0){
        if(this.state.oldDate !== item.date){
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
                        <View style={styles.sentMessageStatus}>
                            <Image style={styles.sentMessageStatusImg} source={require('../../../assets/img/png/chat/checkWhite.png')} />
                            <View style={styles.recievedChecked}>
                                <Image style={styles.sentMessageStatusImg} source={require('../../../assets/img/png/chat/checkWhite.png')} />
                            </View>
                        </View>

                    </View>
                    <View style={styles.arrowRight}></View>
                </View>
            )}
        </View>
    )
}
}

export default ChatScreen;