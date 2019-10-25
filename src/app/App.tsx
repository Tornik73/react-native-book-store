import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from './redux/config-store';
import { FirebaseNotification } from './util/firebase-notification/firebase-notification';
import { TopLevelNavigation } from './navigation/tab-navigator/tab-stack-navigator';
import NavigationService from './services/navigation.service';
import * as RNLocalize from "react-native-localize";

FirebaseNotification.checkPermission();
FirebaseNotification.messageListener();

const mainStore = store;
 
console.log(RNLocalize.getLocales());
console.log(RNLocalize.getCurrencies());
 
RNLocalize.addEventListener("change", () => {
  // do localization related stuff…
});

export default class App extends Component{

  render(){

    return (
      <Provider store={mainStore} >
          <TopLevelNavigation   ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}      
          />
      </Provider> 
    )
  }
}
