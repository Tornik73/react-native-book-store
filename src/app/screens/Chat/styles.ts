import { StyleSheet } from 'react-native';

function elevationShadowStyle(elevation:any) {
    return {
        elevation,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

    };
}

export default StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    chatContainer:{
        paddingTop: 10,
        paddingHorizontal: 8,
        marginBottom: 54
    },
    receivedMessage: {
        display: 'flex',
        backgroundColor: 'rgb(223, 230, 238)',
        marginBottom: 15,
        borderRadius: 8,
        paddingLeft: 12,
        paddingTop: 5,
        paddingBottom: 4,
        width: '70%',
    },
    sentMessage: {
        backgroundColor: 'rgb(250, 29, 63)',
        marginBottom: 15,
        borderRadius: 8,
        paddingLeft: 12,
        paddingTop: 10,
        paddingBottom: 4,
        width: 225,
    },
    chatMessage: {
        display: 'flex',
        flexDirection: 'column',
    },
    messageItemName: {
        color: 'rgb(168, 173, 180)',
        fontSize: 12,
    },
    messageItemText: {
        color: 'rgb(62, 74, 89)',
        width: '80%',
        fontSize: 16,
    },
    messageItemTime: {
        display: 'flex',
        marginLeft: 'auto',
        color: 'rgb(185, 189, 195)',
        fontSize: 12,
        marginRight: 6
    },
    sentMessageItemText: {
        color: 'white',
        fontSize: 16,
    },
    sentMessageStatus: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    sentMessageStatusImg: {
        width: 14,
        height: 10
    },
    recievedChecked: {
        position: 'relative',
        left: -7
    },
    sendingMessageIndicator: {
        backgroundColor: 'rgb(223, 230, 238)',
        width: 80,
        height: 45,
        borderRadius: 8,
        marginBottom: 10
    },
    sendingMessageIndicatorItem: {
 
    },
    inputMessageField: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        position: 'absolute',
        paddingHorizontal: 8,
        bottom: 0,
        backgroundColor: 'white',
        width: '100%',
        paddingBottom: 10
    },
    inputField: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        width: '80%',
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    input: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 16,
        width: '100%',
    },
    sendMessage: {
        width: 46,
        height: 43,
    },
    sendMessageImg: {
        width: '100%',
        height: '100%',
    },
    voiceImg: {
        marginLeft: 15,
        marginRight: 5,
        width: 26,
        height: 26
    },
    test: {
        backgroundColor: 'red',
        color: 'white',
        width: '100%'
    },
    mainImagePaper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',

    },
    chatGroupBlock: {
        display: 'flex',
        flexDirection: 'row'
    },
    groupImages: {
        marginRight: 10
    },
    rowImage: {
        height: '50%',
        display: 'flex',
        flexDirection: 'row',
    },
    mainImages: {
        borderRadius: 5,
        width: 20,
        height: 20,
        margin: 1,
    },
    mainImagesBottom: {
        borderRadius: 5,
        width: 20,
        height: 20,
        margin: 1,
    },
    sportCard: {     
        flex: 1,  
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 3,
        marginLeft: 15,
        marginBottom: 5,
        borderRadius: 5,
    },
    chatTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    toChatIcon: {
        width: 10,
        height: 10
    },  
    callIcon: {
        width: 16,
        height: 16,
    },
    invalidNameIcon: {
        width: 20,
        height: 4,
    },
    arrowLeft: {
        marginTop: 9,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 5,
        borderLeftWidth: 0,
        borderTopColor: 'transparent',
        borderRightColor: "rgb(223, 230, 238)",
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    receivedMessageArrow: {
        display: 'flex',
        flexDirection:'row',
    },
    sendingMessage: {
        display: 'flex',
        flexDirection:'row',
        marginBottom: 10
    },  
    sentMessageArrow: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'flex-end'
    },
    arrowRight: {
        marginTop: 9,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 5,
        borderRightWidth: 0,
        borderBottomWidth: 5,
        borderLeftWidth: 5,
        borderTopColor: 'transparent',
        borderRightColor: "transparent",
        borderBottomColor: 'transparent',
        borderLeftColor: 'rgb(250, 29, 63)',
    },
    centerDate: {
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 10
    },
    timeIcon: {
        width: 16,
        height: 16
    }
});