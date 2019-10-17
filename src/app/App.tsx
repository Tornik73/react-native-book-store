import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import HomeScreen from './screens/Home/HomeScreen';
import { View, Alert } from 'react-native';
import store from './redux/config-store';
import { FooterItemsEnum } from './shared/enums/footer-items.enum';
import FooterComponent from './components/home/footer/FooterScreen';
import LoginScreen from './screens/Login/LoginScreen';
import ProfileScreen from './screens/Profile/Profile.screen';
import firebase from 'react-native-firebase';
export class EmptyScreen extends Component{
  render(){
    return (<View></View>)
  }
}

const TopLevelNavigation = createAppContainer(
  createBottomTabNavigator({
    Home: { screen: HomeScreen, navigationOptions: () => ({ title: FooterItemsEnum.HOME, tabBarTestID: FooterItemsEnum.HOME }) },
    Profile: {screen: ProfileScreen, navigationOptions: () => ({ title: FooterItemsEnum.PROFILE, tabBarTestID: FooterItemsEnum.PROFILE })},
    Login: { screen: LoginScreen, navigationOptions: () => ({ title: FooterItemsEnum.LOGIN, tabBarTestID: FooterItemsEnum.LOGIN})},
  }, {
    tabBarComponent: props => <FooterComponent {...props} />,
  })
)
const mainStore = store;

export default class App extends Component{
  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        this.getFcmToken();
    } else {
        this.requestPermission();
    }
  }
  private requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
        // User has rejected permissions
    }
  }
  
  private getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
    } else {
      this.showAlert('Failed', 'No token received');
    }
  }

  private showAlert = (title: any, message: any) => {
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }


  messageListener = async () => {

    const notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });

    const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });
  
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }

    firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }
  componentDidMount() {
    this.checkPermission();
    this.messageListener();
  }
  render(){
    return (
      <Provider store={mainStore}>
          <TopLevelNavigation />
      </Provider> 
    )
  }
}
