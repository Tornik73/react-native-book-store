import styles from './styles';
import React, { Component } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { AuthorsBooks } from '../../models/authorBook.model'
import { Book } from '../../models';

interface Props {}
interface State { 
  data: AuthorsBooks[];
  isLoading: boolean;
}
class HomeScreen extends Component<Props, State> {
  constructor(props){
    super(props);
    this.state = {
      data: null,
      isLoading: false,
    };
  }

  public componentDidMount(): void{
    this.setState({ isLoading: false });
    fetch('http://10.10.2.111:4010/books/', {
       method: 'GET'
    })
    .then((response: Response) => response.json())
    .then((responseJson: AuthorsBooks[]) => {

       this.setState((): State => ({
          data: responseJson,
          isLoading: true
       }));
       
    })
    .catch((error: object) => {
       console.error(error);
    });
  }

  private Item = ({ bookItem }): JSX.Element => {
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
    const book: AuthorsBooks[] = this.state.data; //TODO: Remove this line
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
export default HomeScreen;