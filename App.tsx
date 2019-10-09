import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/app/screens/Home/HomeScreen';
import { View } from 'react-native';
import store from './src/app/redux/config-store';
import { FooterItemsEnum } from './src/app/shared/enums/footer-items.enum';
import FooterComponent from './src/app/screens/Footer/FooterScreen';
import LoginScreen from './src/app/screens/Login/LoginScreen';

// const DiscoverStack = createStackNavigator({
//   Home: HomeScreen,
//   // AllNewVenues: AllNewVenues,
//   // Featured: Featured,
//   // TopRated: TopRated,
//   // VenuePage:  VenueProfilePage,
//   // CreateVenue: CreateVenue,
// }, {
//   defaultNavigationOptions: {
//     header: (props) => <HomeScreen {...props}/>
//   }
// });

export class EmptyScreen extends Component{
  render(){
    return (<View></View>)
  }
}

const TopLevelNavigation = createAppContainer(
  createBottomTabNavigator({
    Home: { screen: HomeScreen, navigationOptions: () => ({ title: FooterItemsEnum.HOME, tabBarTestID: FooterItemsEnum.HOME }) },
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
