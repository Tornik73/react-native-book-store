import styles from './styles';
import React, { Component } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { AuthorsBooksModel } from '../../shared/model/authorBook.model';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/user.actions';
import { ProfileReducerState } from 'src/app/shared/model';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  getAllBooks: () => Promise<AuthorsBooksModel>;
  token: string;
  isLoad: boolean;
  isLogined: boolean;
  bookResponseToState: AuthorsBooksModel[];
}
interface State { 
  data: AuthorsBooksModel[];
  isLoading: boolean;
}
interface mapStateToPropsModel {
  profileReducer: ProfileReducerState;
}

class HomeScreen extends Component<Props, State> {
  constructor(props: Props){
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }


  public getAllBooks(): void {
    this.setState({ isLoading: false });
    this.props.getAllBooks().then(() => {
        this.setState({
          data: this.props.bookResponseToState,
          isLoading: true
        })
      }
    )
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

  private renderData(): JSX.Element { 
    const book: AuthorsBooksModel[] = this.state.data; //TODO: Remove this line
    return( 
      <SafeAreaView>
        <FlatList
          data={book}
          renderItem={({ item }) => <this.Item bookItem={item.book}  />}
          keyExtractor={item => item.bookId.toString()}
        />
      </SafeAreaView>
    )
  }

  public render(): JSX.Element {
    if(!this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    } else {
      return (
        <View >
          { this.renderData() } 
        </View>
      );
    }
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