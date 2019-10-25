
import firebase from "react-native-firebase";
import { Alert } from "react-native";

export const FirebaseNotification = {
    checkPermission: async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            FirebaseNotification.getFcmToken();
        } else {
            FirebaseNotification.requestPermission();
        }
    },
    
    messageListener: async () => {
    
        const notificationListener = firebase.notifications().onNotification((notification) => {
            const { title, body } = notification;
            FirebaseNotification.showAlert(title, body);
        });
    
        const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            FirebaseNotification.showAlert(title, body);
        });
      
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
            FirebaseNotification.showAlert(title, body);
        }
    
        firebase.messaging().onMessage((message) => {
          // console.log(JSON.stringify(message));
        });
    },

    requestPermission: async () => {
        try {
          await firebase.messaging().requestPermission();
          // User has authorised
        } catch (error) {
            // User has rejected permissions
        }
    },
      
    getFcmToken: async () => {
        const fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          // console.log(fcmToken);
        } else {
            FirebaseNotification.showAlert('Failed', 'No token received');
        }
    },
    
    showAlert: (title: any, message: any)  => {
        Alert.alert(
          title,
          message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
    }
    

}