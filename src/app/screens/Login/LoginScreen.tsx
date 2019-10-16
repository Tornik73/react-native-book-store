import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, TextInput, ActivityIndicator } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";

import styles from './styles';
import * as loginActions from "../../redux/actions/auth.actions";
import * as profileActions from '../../redux/actions/profile.actions';
import AsyncStorage from '@react-native-community/async-storage';

const jwt = require('jwt-decode');

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  
  login: () => void,
  changeFooterImage: (img: string) => void,
  loadingStart: () => void,
  loadingEnd: () => void,

  token: string, 
  isLoad: boolean;
  isLogined: boolean,
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

  public onLogin() {
      this.props.login();
      this.props.loadingStart();

      try {
        setTimeout(async ()=> {

          const token = await AsyncStorage.getItem('token');
          const img = await AsyncStorage.getItem('img');
          if (token !== null && img !== null) {
            this.props.changeFooterImage(img);
            this.props.loadingEnd();
            this.props.navigation.navigate('Home');
          }

        }, 1000)
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
            <View>
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
  changeFooterImage: (img: string) => dispatch(profileActions.updateProfileImage(img)),
  loadingStart: () => dispatch(loginActions.loadingStart()),
  loadingEnd: () => dispatch(loginActions.loadingEnd())
});

const mapStateToProps = (state: any) => {
  return {
      isLogined: state.authReducer.isLogined,
      img: state.profileReducer.profileImg,
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)