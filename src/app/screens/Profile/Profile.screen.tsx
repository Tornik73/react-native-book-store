import styles from './styles';
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import * as loginActions from "../../redux/actions/auth.actions";
import * as profileActions from "../../redux/actions/profile.actions";
import { UserModel } from 'src/app/shared/model';
import { environment } from '../../environments/environment';
import ImagePicker from 'react-native-image-picker';
const jwt = require('jwt-decode');
const RNGRP = require('react-native-get-real-path');
const RNFS = require('react-native-fs');

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  logout: () => void;
  putRequest: (user: UserModel) => void;
  profileImageChange: (img: string) => void;
  isLogined: boolean;
  responseUserData: UserModel;
  profileImg: string;
}
interface State {
  user: UserModel;
  previosProfileImage: string;
  profileImage: string| any; // TODO: Remove any
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
        img: '',
        isAdmin: false,
      },
      previosProfileImage: '',
      profileImage: environment.defaultImg,
      editMode: false
    };
  }

  public logOut(): void {
    this.props.logout();
  }

  public handleChoosePhoto = (): void => {
    const options = {
      noData: true
    };

    this.setState({
      previosProfileImage: this.state.profileImage
    })

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({
          editMode: true,
          profileImage: response.uri 
        })
      }
    });
  }

  public async saveImage (): Promise<void> {

    this.setState({
      editMode: false,
    });
    // console.log(this.props.profileImg);

    RNGRP.getRealPathFromURI(this.state.profileImage).then((path: string) =>
      RNFS.readFile(path, 'base64').then((imageBase64: string )=> {
        const img = 'data:image/png;base64,' + imageBase64;
        this.props.profileImageChange(img);
        this.setState({
          user: {
            ...this.state.user,
            img: img
          }
        })
      }
      ).then(() => {
        this.props.putRequest(this.state.user);
      })
    )



  }

  public cancelSavingImage (): void {

    this.setState({
      editMode: false,
      profileImage: this.state.previosProfileImage
    })

  }

  public async initUserState(): Promise<void> {
    let userFromStorage: UserModel;
    if(this.props.responseUserData){
      userFromStorage = this.props.responseUserData;
    } else {
      userFromStorage = jwt(await AsyncStorage.getItem('token'));
    }
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
        isAdmin: userFromStorage.isAdmin,
        img: await AsyncStorage.getItem('img'), // TODO : REMOVE
      },
      profileImage: await AsyncStorage.getItem('img') // TODO : REMOVE
    });
  }

  public componentDidMount() {
    this.initUserState();
  }

  render() {
   const { user, profileImage } = this.state;
    return (
      <View>
        <View>
          { profileImage && (
            <Image style={styles.avatar} source={{uri: profileImage}}/>
          )}

          {this.state.editMode &&
           <View style={styles.choosePhoto}>
              <View style={styles.saveButton}>
                <Button title={'Save'} color='#4CAF50' onPress={() => this.saveImage()}/>     
              </View>
              <View>
                <Button title={'Cancel'}  color='#f44336' onPress={() => this.cancelSavingImage()}/>     
              </View>
           </View>    
            }
            {!this.state.editMode &&
              <View  style={styles.choosePhoto}>
                <Button title={'Choose photo'} onPress={this.handleChoosePhoto}/>
              </View>
            }


        </View>
          <View>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{user.username}</Text>
              <Text style={styles.info}>{user.name} {user.lastname} / {user.country} </Text>
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
  putRequest: (user: UserModel) => dispatch(profileActions.updateUser(user)),
  profileImageChange: (img: string) => dispatch(profileActions.updateProfileImage(img))
});

const mapStateToProps = (state: any) => {
  return {
      isLogined: state.authReducer.isLogined,
      token: state.authReducer.token,
      responseUserData: state.profileReducer.response,
      profileImg: state.profileReducer.profileImg
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen)