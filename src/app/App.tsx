import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import HomeScreen from './screens/Home/HomeScreen';
import { View } from 'react-native';
import store from './redux/config-store';
import { FooterItemsEnum } from './shared/enums/footer-items.enum';
import FooterComponent from './components/home/footer/FooterScreen';
import LoginScreen from './screens/Login/LoginScreen';
import ProfileScreen from './screens/Profile/Profile.screen';

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

  render(){
    return (
      <Provider store={mainStore}>
          <TopLevelNavigation />
      </Provider> 
    )
  }
}
