import React, { Component } from 'react';
import { Text, View, Picker, } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import styles from './styles';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  language: string;
}

export default class SettingsScreen extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      language: 'en'
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>Choose language: </Text>
          <Picker selectedValue={this.state.language} style={{height: 50, width: 150}} onValueChange={(itemValue,
            itemIndex)=>
            this.setState({language: itemValue})
            }>
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Russian" value="ru" />
          </Picker>
      </View>
    );
  }
}
