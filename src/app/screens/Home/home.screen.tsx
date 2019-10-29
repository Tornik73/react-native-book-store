import styles from './styles';
import React, { Component } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, RefreshControl, TouchableOpacity, Button } from 'react-native';
import { AuthorsBooksModel } from '../../shared/model/authorBook.model';
import { NavigationScreenProp, NavigationState, NavigationParams, ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import * as booksActions from '../../redux/actions/books.actions';
import { BooksReducerState, TranslationsModel, Book, Author } from '../../../app/shared/model';
import Database from '../../database/Database';

const db = new Database();
interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  getAllBooks: () => void;
  bookResponseToState: AuthorsBooksModel[];
}

interface State { 
  refreshing: boolean
  data: AuthorsBooksModel[];


  products: [],
}

interface mapStateToPropsModel {
  booksReducer: BooksReducerState;
}

class HomeScreen extends Component<Props, State> {
  
  constructor(props: Props){
    super(props);
    this.state = {
      refreshing: false,
      data: [],
      products: [],

    };
  }

  public getAllBooks(): void {

    this.setState({refreshing: true});

    this.props.getAllBooks();

    this.setState({
        refreshing: false,
        data: this.props.bookResponseToState,
    });
  }

  public componentDidMount(): void{
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getProducts();
    });
    db.addProduct({prodId:21, prodName:'name', prodDesc:'desc', prodImage:'img', prodPrice: 123})
    this.getAllBooks();
  }
  getProducts() {
    let products = [];
    db.listProduct().then((data) => {
      products = data;
      console.log(products, 'PRODUCTS');
    }).catch((err) => {
      console.log(err);
    })
  }
  private Item = ( bookItem: Book, author: Author): JSX.Element => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{bookItem.title}</Text>
        <Text style={styles.text}>Author: {author.name}</Text>
        <Text style={styles.text}>Description: {bookItem.description}</Text>
        <Text style={styles.text}>Price: {bookItem.price}</Text>
      </View>
    );
  }

  private renderData() { 

    const book: AuthorsBooksModel[] = this.props.bookResponseToState;
    return( 
          <FlatList
            data={book}
            renderItem={({ item }) => this.Item(item.book, item.author) }
            keyExtractor={item => item.bookId.toString()}
          />
    )
  }

  public render() {
    return(

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.getAllBooks()} />
            }>
            {!this.state.refreshing ?
                (this.renderData() ):(
                <View></View>)
            }
          </ScrollView>
    )
  }
}
const mapDispatchToProps = {
  getAllBooks: () => booksActions.getAllBooks(),
};

const mapStateToProps = (state: mapStateToPropsModel ) => {
  return {
    bookResponseToState: state.booksReducer.booksResponse
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)