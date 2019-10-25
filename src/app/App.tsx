import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import store from './redux/config-store';
import { FooterItemsEnum } from './shared/enums/footer-items.enum';
import FooterComponent from './components/home/footer/FooterScreen';
import LoginScreen from './screens/Login/LoginScreen';
import ProfileScreen from './screens/Profile/Profile.screen';
import ChatScreen from './screens/Chat/Chat.screen';
import { HomeHeaderComponent } from '../app/components/header/header.component';
import HomeScreen from './screens/Home/HomeScreen';
import { FirebaseNotification } from './util/firebase-notification/firebase-notification';
import CartScreen from './screens/Cart/CartScreen';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Chat: ChatScreen,
  }, 
  {
    defaultNavigationOptions: {
      header: (props) => <HomeHeaderComponent {...props}/>,
    },
  }
);

HomeStack.navigationOptions = ({ navigation }:any) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export class EmptyScreen extends Component{
  render(){
    return (<View></View>)
  }
}

const TopLevelNavigation = createAppContainer(
  createBottomTabNavigator({
    Home: { screen: HomeStack, navigationOptions: () => ({ title: FooterItemsEnum.HOME, tabBarTestID: FooterItemsEnum.HOME }) },
    Profile: {screen: ProfileScreen, navigationOptions: () => ({ title: FooterItemsEnum.PROFILE, tabBarTestID: FooterItemsEnum.PROFILE })},
    Login: { screen: LoginScreen, navigationOptions: () => ({ title: FooterItemsEnum.LOGIN, tabBarTestID: FooterItemsEnum.LOGIN})},
    Cart: { screen: CartScreen, navigationOptions: () => ({ title: FooterItemsEnum.CART, tabBarTestID: FooterItemsEnum.CART})},
  }, {
    tabBarComponent: props => <FooterComponent {...props} />,

  },
  )
)

FirebaseNotification.checkPermission();
FirebaseNotification.messageListener();

const mainStore = store;

export default class App extends Component{


  render(){

    return (
      <Provider store={mainStore}>
          <TopLevelNavigation />
      </Provider> 
    )
  }
}
