import styles from './styles';
import React, { Component } from 'react';
import { View, SafeAreaView, Button } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams, ScrollView } from 'react-navigation';
import RNPaypal from 'react-native-paypal-lib';
import Axios from 'axios';
import Stripe from 'react-native-stripe-api';
import { environment } from '../../environments/environment';
import AddSubscriptionView from '../../components/addSubscriptionView/AddSubscriptionView.component';


const STRIPE_ERROR = 'Payment service error. Try again later.';
const SERVER_ERROR = 'Server error. Try again later.';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_uwjRZA128Nvmq3111lJLJxhs00rQ8H9M7T';

const getCreditCardToken = (creditCardData) => {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).then(response => response.json());
};

const subscribeUser = (creditCardToken) => {
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    setTimeout(() => {
      resolve({ status: true });
    }, 1000)
  });
};


const createCreditCardToken = (creditCardData) => {
  const card = {
      'card[number]': creditCardData.values.number.replace(/ /g, ''),
      'card[exp_month]': creditCardData.values.expiry.split('/')[0],
      'card[exp_year]': creditCardData.values.expiry.split('/')[1],
      'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    method: 'post',
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).then(response => response.json());
};

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface State {
  submitted: boolean;
  error: null | any;
 }

interface mapStateToPropsModel {}

class CartScreen extends Component<Props, State> {

  static navigationOptions = {
    title: 'Subscription page',
  };

  constructor(props: Props){
    super(props);
    this.state = {
      submitted: false,
      error: null
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
  onSubmit = async (creditCardInput) => {

    const {
      navigation
    } = this.props;
    this.setState({
      submitted: true
    });
    let creditCardToken;
    try {
      creditCardToken = await getCreditCardToken(creditCardInput);
      if (creditCardToken.error) {
        this.setState({
          submitted: false,
          error: STRIPE_ERROR
        });
        return;
      }
    } catch (e) {
      this.setState({
        submitted: false,
        error: STRIPE_ERROR
      });
      return;
    }
    const {
      error
    } = await subscribeUser(creditCardToken);
    if (error) {
      this.setState({
        submitted: false,
        error: SERVER_ERROR
      });
    } else {
      this.setState({
        submitted: false,
        error: null
      });
      navigation.navigate('Home')
    }
  }

  public renderData = () => {
    const { submitted, error } = this.state;
    return( 
      <View style={styles.container}>
        <Button title={'PayPal'} onPress={() => {this.payWithPayPal()}}></Button>
        {/* <Button color={'red'} title={'Stripe'} onPress={() => {this.payWithStripe()}}></Button> */}
        <AddSubscriptionView
          error={error}
          submitted={submitted} 
          onSubmit={this.onSubmit}
        />
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