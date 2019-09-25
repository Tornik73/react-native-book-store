import styles from './styles';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class SettingsScreen extends Component<any, any> {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is the NameScreen.</Text>
      </View>
    );
  }
}

export default SettingsScreen;