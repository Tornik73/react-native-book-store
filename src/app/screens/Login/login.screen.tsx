import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Button, TextInput, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import styles from './styles';
import * as loginActions from "../../redux/actions/auth.actions";
import * as profileActions from '../../redux/actions/profile.actions';
import {GoogleAuth, GoogleConfigure} from '../../util/googleAuth/googleAuth';
import { AuthReducerState, ProfileReducerState } from '../../shared/model';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;

  login: () => void;
  updateFooterImage: (img: string) => void;
  loadingStart: () => void;
  loadingEnd: () => void;

  userImg: string;
  isLoad: boolean;
  isLogined: boolean;
}

interface State {
  username: string;
  password: string;
}

interface MapStateToProps {
  authReducer: AuthReducerState;
  profileReducer: ProfileReducerState;
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

  componentDidMount() {
    GoogleConfigure();
  }
  
  public onLogin(): void {
      this.props.login();
      this.props.updateFooterImage(this.props.userImg);
      this.props.loadingEnd();
  }


  public loginGoogle = (): void => {
    // TODO: GOOGLE AUTH LOGIC
    GoogleAuth().then((res: any)  => {
    });
  };

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

              <View style={styles.socialButtonContainer}>
                <TouchableOpacity 
                  style={styles.googleButton}
                  onPress={()=>this.loginGoogle()}>
                  <Image 
                    style={{height: 20, width: 20, marginRight: 16}} 
                    source={require('../../../assets/img/png/googleLogo.png')}
                  />
                  <Text
                    style={{
                      fontFamily: 'WorkSans-Medium',
                      color: '#45403f',
                      fontSize: 18,
                    }}>
                    Google
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
        }
      </View>
    );
  }
}

const mapDispatchToProps = { 
  login: () => loginActions.loginRequest(),
  updateFooterImage: (img: string) => profileActions.profileImageChanged(img),
  loadingStart: () => loginActions.startLoading(),
  loadingEnd: () => loginActions.endLoading()
};

const mapStateToProps = (state: MapStateToProps) => {
  return {
      userImg: state.authReducer.userState.img,
      isLogined: state.authReducer.isLogined,
      img: state.profileReducer.profileImg,
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen)