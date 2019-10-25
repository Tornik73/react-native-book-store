import styles from './styles';
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationState, NavigationParams, ScrollView } from 'react-navigation';
import * as loginActions from "../../redux/actions/auth.actions";
import * as profileActions from "../../redux/actions/profile.actions";
import { UserModel, AuthReducerState, ProfileReducerState } from 'src/app/shared/model';
import { environment } from '../../environments/environment';
import ImagePicker from 'react-native-image-picker';
import Base64Component from '../../components/base64/base64.component';

const RNGRP = require('react-native-get-real-path');
const RNFS = require('react-native-fs');

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;

  logout: () => void;
  putRequest: (user: UserModel) => void;

  isLogined: boolean;
  
  profileUserState: UserModel;
  profileImg: string;
}

interface State {
  previosProfileImage: string;
  profileImage: string;
  editMode: boolean;
}

interface mapStateToPropsModel {
  authReducer: AuthReducerState;
  profileReducer: ProfileReducerState;
}

class ProfileScreen extends Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = { 
      previosProfileImage: '',
      profileImage: environment.defaultImg,
      editMode: false,
    };
  }

  public componentDidMount(): void {
    this.initUserState();
  }

  public initUserState(): void {
    let userImg: string = this.props.profileUserState.img;
    this.setState({
      profileImage: userImg,
    });
  }

  public saveImage (): void {

    this.setState({
      editMode: false,
    });

    RNGRP.getRealPathFromURI(this.state.profileImage).then((path: string) =>
      RNFS.readFile(path, 'base64').then((imageBase64: string )=> {
        const img = 'data:image/png;base64,' + imageBase64;
        const user: UserModel = this.props.profileUserState;
        user.img = img;
        this.props.putRequest(user);
      }
      )
    )
  }

  public cancelSavingImage (): void {

    this.setState({
      editMode: false,
      profileImage: this.state.previosProfileImage
    })

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

  render() {
   const { profileUserState, profileImg, logout } = this.props;
    return (
      <ScrollView>
        <View>
            <Image style={styles.avatar} source={{uri: this.state.profileImage}}/>

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
              <Text style={styles.name}>{profileUserState.username}</Text>
              <Text style={styles.info}>{profileUserState.name} {profileUserState.lastname} / {profileUserState.country} </Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
                
              <TouchableOpacity style={styles.buttonContainer} onPress={() => logout()}>
                <Text>Log out</Text>  
              </TouchableOpacity>    
              <Base64Component />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = {
  logout: () => loginActions.logout(),
  putRequest: (user: UserModel) => (profileActions.updateUserRequest(user)),
};

const mapStateToProps = (state: mapStateToPropsModel ) => {
  return {
      isLogined: state.authReducer.isLogined,
      profileUserState: state.authReducer.userState,
      profileImg: state.profileReducer.profileImg
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen)



