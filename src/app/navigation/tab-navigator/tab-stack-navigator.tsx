
import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FooterItemsEnum } from "../../../app/shared/enums";
import ProfileScreen from "../../screens/Profile/profile.screen";
import LoginScreen from "../../screens/Login/loginScreen";
import CartScreen from "../../screens/Cart/CartScreen";
import FooterComponent from "../../components/home/footer/FooterScreen";
import { HomeStack } from "../home-navigator/home-stack-navigator";

  export const TopLevelNavigation = createAppContainer(
    createBottomTabNavigator({
      Home: { screen: HomeStack, navigationOptions: () => ({ title: FooterItemsEnum.HOME, tabBarTestID: FooterItemsEnum.HOME }) },
      Profile: {screen: ProfileScreen, navigationOptions: () => ({ title: FooterItemsEnum.PROFILE, tabBarTestID: FooterItemsEnum.PROFILE })},
      Login: { screen: LoginScreen, navigationOptions: () => ({ title: FooterItemsEnum.LOGIN, tabBarTestID: FooterItemsEnum.LOGIN})},
      Cart: { screen: CartScreen, navigationOptions: () => ({ title: FooterItemsEnum.CART, tabBarTestID: FooterItemsEnum.CART})},
    }, 
    {
      tabBarComponent: props => <FooterComponent {...props} />,
    },
  )
);
