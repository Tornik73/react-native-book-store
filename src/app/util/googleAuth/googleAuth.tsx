import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {Platform} from 'react-native';

const config = {
	webClientId: '893912839232-s3nse0a5ihs4cqe885i1okp08n9oi36s.apps.googleusercontent.com',
	iosClientId: '893912839232-s3nse0a5ihs4cqe885i1okp08n9oi36s.apps.googleusercontent.com'
}

const GoogleConfigure = () => {
  GoogleSignin.configure({
    webClientId:
      Platform.OS === 'ios' ? config.iosClientId : config.webClientId,
    iosClientId: config.iosClientId,
    offlineAccess: false,
  });
};

const GoogleAuth = async () => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const userInfo = await GoogleSignin.signIn();
    return userInfo;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log(error);
      return 'cancel';
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log(error);
      // operation (f.e. sign in) is in progress already
      return 'progress';
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log(error);
      return 'ps_not_available';
    } else {
      console.log(error);
    }
  }
};

export {GoogleAuth, GoogleConfigure};
