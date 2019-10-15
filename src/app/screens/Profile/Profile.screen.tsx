import styles from './styles';
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import * as loginActions from "../../redux/actions";
import { UserModel } from 'src/app/shared/model';
import { environment } from '../../environments/environment';

const jwt = require('jwt-decode');

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  logout: () => void;
  isLogined: boolean,
}
interface State {
  user: UserModel;
  file: string;
  imageBase64: string | any; // TODO: Remove any
  editMode: boolean
}

class ProfileScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      user: {
        id: null,
        email: '',
        name: '',
        lastname: '',
        username: '',
        telephone: '',
        age: null,
        country: '',
        gender: '',
        img: environment.defaultImg,
        isAdmin: false,
      },
      file: '',
      imageBase64: environment.defaultImg,
      editMode: false
    };
  }

  public logOut(): void {
    this.props.logout();
  }

  public async initUserState(){
    const userFromStorage: UserModel = jwt(await AsyncStorage.getItem('token'));
    console.log(userFromStorage);
    const img = await AsyncStorage.getItem('img');
    this.setState({
      user: {
        id: userFromStorage.id,
        email: userFromStorage.email,
        name: userFromStorage.name,
        lastname: userFromStorage.lastname,
        username: userFromStorage.username,
        telephone: userFromStorage.telephone,
        age: userFromStorage.age,
        country: userFromStorage.country,
        gender: userFromStorage.gender,
        img: environment.defaultImg,
        isAdmin: userFromStorage.isAdmin,
      },
      imageBase64: img
    });
  }

  public componentDidMount() {
    this.initUserState();
  }

  render() {
   
    return (
      <View>
        <View>
          <Image style={styles.avatar} source={{uri: this.state.imageBase64}}/>
        </View>
          <View>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.user.username}</Text>
              <Text style={styles.info}>{this.state.user.name} {this.state.user.lastname} / {this.state.user.country} </Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
                
              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.logOut()}>
                <Text>Log out</Text>  
              </TouchableOpacity>              
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => dispatch(loginActions.logout()),
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
)(ProfileScreen)