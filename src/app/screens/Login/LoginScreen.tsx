import styles from './styles';
import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';

class LoginScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }
  
  onLogin() {
    const { username, password } = this.state;

    alert('Credentials' + `${username} + ${password}`);
  }
  render() {
    return (
         <View style={styles.container}>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
          />
          
          <Button
            title={'Login'} 
            onPress={this.onLogin.bind(this)}
          />
        </View>
    );
  }
}

export default LoginScreen;