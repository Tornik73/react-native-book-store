import styles from './styles';
import React, { Component } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, RefreshControl, TouchableOpacity, Button } from 'react-native';
import { AuthorsBooksModel } from '../../shared/model/authorBook.model';
import { NavigationScreenProp, NavigationState, NavigationParams, ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/books.actions';
import { BooksReducerState } from 'src/app/shared/model';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  getAllBooks: () => void;
  bookResponseToState: AuthorsBooksModel[];
}

interface State { 
  refreshing: boolean
  data: AuthorsBooksModel[];
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
    this.getAllBooks();
  }

  private Item = ({ bookItem }:any): JSX.Element => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{bookItem.title}</Text>
        <Text style={styles.text}>Author: {bookItem.author}</Text>
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
            renderItem={({ item }) => <this.Item bookItem={item.book}  />}
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
  getAllBooks: () => userActions.getAllBooks(),
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