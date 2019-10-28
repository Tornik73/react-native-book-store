import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../../screens/Home/home.screen";
import ChatScreen from "../../screens/Chat/chat.screen";
import { HomeHeaderComponent } from "../../../app/components/header/header.component";
import React from "react";
import SettingsScreen from "../../screens/Settings/settings.screen";

export const HomeStack = createStackNavigator(
    {
      Home: HomeScreen,
      Chat: ChatScreen,
      Settings: SettingsScreen,
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
  
