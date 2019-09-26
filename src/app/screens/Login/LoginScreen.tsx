import styles from './styles';
import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class LoginScreen extends Component<any, any> {
  render() {
    return (
      <View style={styles.container}>
                 <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

export default LoginScreen;