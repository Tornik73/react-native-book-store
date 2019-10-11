import styles from './styles';
import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import * as loginActions from "../../redux/actions";

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  logout: () => void;
  isLogined: boolean,
}
interface State {
  username: string;
  password: string;
}

class ProfileScreen extends Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
    };
  }

  public logOut(): void {
    this.props.logout();
    this.props.navigation.navigate('home');
  }

  render() {
   
    return (
      <View style={styles.container}>
        <Text>This is the NameScreen.</Text>
        <Button
                title={'LogOut'} 
                onPress={() => this.logOut()}
              />
      </View>
    );
  }
}

// const mapDispatchToProps = (dispatch: any) => ({
//   logout: () => dispatch(loginActions()),
// });

const mapStateToProps = (state: any) => {
  return {
      isLogined: state.authReducer.isLogined,
      token: state.authReducer.token
  }
};

export default connect(
  mapStateToProps,
  null
)(ProfileScreen)