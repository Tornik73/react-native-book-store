import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './src/app/screens/Home/HomeScreen';
import SettingsScreen from './src/app/screens/Settings';
import LoginScreen from './src/app/screens/Login/LoginScreen';
import Ionicons  from './node_modules/react-native-vector-icons/Ionicons';
import React, {Component} from 'react';

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,    
    Settings: SettingsScreen,
    Login: LoginScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home`;
          // iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-options`;
        }
        else if (routeName === 'Login') {
          iconName = `ios-log-in`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(TabNavigator);
