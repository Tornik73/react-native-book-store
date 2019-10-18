import styles from './styles';
import React, { Component } from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams, ScrollView } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State { }

interface mapStateToPropsModel {}

class CartScreen extends Component<Props, State> {

  constructor(props: Props){
    super(props);
    this.state = {
    };
  }

  public payWithPayPal = () => {
    console.log('paypal');
  }


  public renderData = () => {
    return(
      <View style={styles.container}>
        <Button title={'PayPal'} onPress={() => {this.payWithPayPal()}}></Button>
        <Button title={'Stripe'} onPress={() => {this.payWithPayPal()}}></Button>
      </View>
    )
  }

  public render() {
    return(
      <SafeAreaView>
      <ScrollView>
        {true ?
            (this.renderData() 
            ):(
            <View></View>)
        }
      </ScrollView>
    </SafeAreaView>
    )
  }
}

export default CartScreen;