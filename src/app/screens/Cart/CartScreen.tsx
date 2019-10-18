import styles from './styles';
import React, { Component } from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams, ScrollView } from 'react-navigation';
import RNPaypal from 'react-native-paypal-lib';
import Axios from 'axios';
import Stripe from 'react-native-stripe-api';
import { environment } from '../../environments/environment';

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

  public payWithPayPal = async () => {
    RNPaypal.paymentRequest({
      clientId: 'AWGES_XlbN2bD1KLqL6fQPM8mwAUXVsd57yWGJrlZ8UrmH3flztZZvdp-zI32gXgUTZyja-WUm0ervR1',
      environment: RNPaypal.ENVIRONMENT.NO_NETWORK,
      intent: RNPaypal.INTENT.SALE,
      price: 60,
      currency: 'USD',
      description: `Android testing`,
      acceptCreditCards: true
    }).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err.message)
    })
  }
  public payWithStripe = async () => {
    const apiKey = 'pk_test_uwjRZA128Nvmq3111lJLJxhs00rQ8H9M7T';
    const client = new Stripe(apiKey);

    // Create a Stripe token with new card infos
    const token = await client.createToken({
          number: '4242424242424242' ,
          exp_month: '09', 
          exp_year: '20', 
          cvc: '111',
          address_zip: '12345'
        });
    fetch(environment.apiUrl+'users/charge', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(token)
        }).then(res => console.log(res));
  }

  public renderData = () => {
    return(
      <View style={styles.container}>
        <Button title={'PayPal'} onPress={() => {this.payWithPayPal()}}></Button>
        <Button color={'red'} title={'Stripe'} onPress={() => {this.payWithStripe()}}></Button>
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