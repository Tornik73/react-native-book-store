import { Component } from "react";
import React from "react";
import { View, Text, TextInput, Button, Platform, NativeModules } from "react-native";
import style from "./style"; 

interface Props {}
interface State {
    encodeText: string;
    decodeText: string;
    encodedText: string;
    decodedText: string;
}
class Base64Component extends Component<Props, State>{

    constructor(props: Props){
        super(props);
        this.state ={ 
            encodeText: '',
            decodeText: '',
            encodedText: '',
            decodedText: '',
        }
    }
    
    encodeStringToBase64 = (stringToEncode: string) => {
        if(Platform.OS === 'ios') {
            NativeModules.Counter.hi();
            NativeModules.Counter.encodeToBase64( stringToEncode, (error: any,encodedString: string) => {
                // console.log(encodedString);
                this.setState({encodedText: encodedString});
              });
            // alert(NativeModules);
            alert('ios'); 
        }
        else {
            NativeModules.Bulb.encodeToBase64(stringToEncode, (encodedString: string) => {
            //   console.log(encodedString);
              this.setState({encodedText: encodedString});
            });
            alert('android');
        }
    
      }
    
    decodeStringFromBase64 = (stringToDecode: string) => {
        NativeModules.Counter.decodeStringFromBase64(stringToDecode, (error: any, decodedString: string) => {
            // console.log(decodedString);
            this.setState({decodedText: decodedString});
        });
    }

    render() {

        return (
            <View>  
                <View style={style.inputContainer}>
                    <TextInput onChangeText={(text) => this.setState({encodeText: text})} placeholder="Encode String to base64"/>         
                    <Button title={'Submit'} onPress={() => this.encodeStringToBase64(this.state.encodeText)}></Button>
                </View>
                <View style={style.inputContainer}>
                    <TextInput onChangeText={(text) => this.setState({decodeText: text})} placeholder="Decode String from base64"/>
                    <Button title={'Submit'} onPress={() => this.decodeStringFromBase64(this.state.decodeText)}></Button>
                </View>
                <View>
                    <Text>Encoded Text: {this.state.encodedText}</Text>
                    <Text>Decoded Text: {this.state.decodedText}</Text>
                </View>
            </View>
        ) 
    }

}
  
export default Base64Component;