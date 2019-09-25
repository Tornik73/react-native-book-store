import styles from './styles';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import { Text, View, Platform, Button } from '../../navigation/node_modules/react-native';
// import { Icon } from "../../navigation/node_modules/react-native-elements";
// You only need NavigationScreenProps for TypeScript
// import { NavigationScreenProp } from "../../navigation/node_modules/react-navigation";

interface Props {
  // navigation: NavigationScreenProp<any, any>;
}

class HomeScreen extends Component<any, any> {
  // static navigationOptions = ({ navigation }: any) => ({
  //   headerTitle: "Home",
  //   headerLeft: Platform.select({
  //     ios: null,
  //     android: (
  //       <Icon
  //         name="md-menu"
  //         type="ionicon"
  //         // containerStyle={styles.icon}
  //         onPress={() => navigation.toggleDrawer()}
  //       />
  //     )
  //   })
  // });

  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View >
        <Text>This is the HomeScreen.</Text>
        {/* <Button title="Details" onPress={() => navigate("DetailScreen")} />
        <Button title="Options" onPress={() => navigate("OptionsScreen")} /> */}
      </View>
    );
  }
}
export default HomeScreen;