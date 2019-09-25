import DetailScreen from '../screens/Detail';
import HomeScreen from '../screens/Home';
import LoadingScreen from '../screens/Loading';
import OptionsScreen from '../screens/Options';
import SettingsScreen from '../screens/Settings';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

interface Props {};
interface State {};
class Navigation extends Component<Props, State> {

    render() {
        return (
          <View>
            <Text>This is the Navigation.</Text>
          </View>
        );
    }
}

export default Navigation;