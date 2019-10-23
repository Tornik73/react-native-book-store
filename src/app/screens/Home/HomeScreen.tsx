import styles from './styles';
import React, { Component } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator, RefreshControl, TouchableOpacity, Button } from 'react-native';
import { AuthorsBooksModel } from '../../shared/model/authorBook.model';
import { NavigationScreenProp, NavigationState, NavigationParams, ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user.actions';
import { ProfileReducerState } from 'src/app/shared/model';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  getAllBooks: () => Promise<AuthorsBooksModel>;
  bookResponseToState: AuthorsBooksModel[];
}

interface State { 
  refreshing: boolean
  data: AuthorsBooksModel[];
}

interface mapStateToPropsModel {
  profileReducer: ProfileReducerState;
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
    this.setState({
      refreshing: true
    })
    this.props.getAllBooks()
    .then((response) => {
      // console.log(response);
        this.setState({
          refreshing: false,
          data: this.props.bookResponseToState,
        })

    })
    .catch((error: object) => {
         console.error(error);
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

    const book: AuthorsBooksModel[] = this.state.data; //TODO: Remove this line
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
        <SafeAreaView>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.getAllBooks()} />
            }>
            {!this.state.refreshing ?
                (this.renderData() ):(
                <View></View>)
            }
          </ScrollView>
        </SafeAreaView>
    )
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  getAllBooks: () => dispatch(userActions.getAllBooks()),
});

const mapStateToProps = (state: mapStateToPropsModel) => {
  return {
    bookResponseToState: state.profileReducer.booksResponse
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)