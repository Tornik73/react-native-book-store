import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, TextInput, ActivityIndicator } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

import styles from './styles';
import * as loginActions from "../../redux/actions/";
import AsyncStorage from '@react-native-community/async-storage';

const jwt = require('jwt-decode');

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  login: () => void,
  isLogined: boolean,
  token: string,
}
interface State {
  username: string;
  password: string;
}

class LoginScreen extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  
  isLoad = () => this.props.isLogined; 

  public async onLogin() {
    // const { username, password } = this.state;
      this.props.login();
      try {
        const token = await AsyncStorage.getItem('token');
        setTimeout(()=>{
          if (token !== null) {
            const userData = jwt(token);
            console.log(userData);
            this.props.navigation.navigate('Home');
          }
        }, 2000)
      }
      catch (error) {
        console.error(error);
      }
  }
  render() {

    return (
      <View style={styles.container}>
        {
          (this.isLoad()) ? 
          <ActivityIndicator size="large" color={'black'}></ActivityIndicator> :
            <View >
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
                onPress={() => this.onLogin()}
              />
            </View>
        }
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  login: () => dispatch(loginActions.login()),
});

const mapStateToProps = (state: any) => {
  return {
      isLogined: state.authReducer.isLogined,
      token: state.authReducer.token
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)