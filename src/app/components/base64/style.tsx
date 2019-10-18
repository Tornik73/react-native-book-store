import { Colors } from "../../shared/helpers/colors"

import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.white,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        display: 'flex', 
        flexDirection: 'row'
    }
})