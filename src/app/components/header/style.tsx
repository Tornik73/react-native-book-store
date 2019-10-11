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
    backWrapper:{
        marginLeft: 20
    },
    back:{
        height: 20,
        width: 12
    },
    titleWrapper:{
        marginLeft: 'auto'
    },
    title:{
        textAlign: 'center',
        fontSize: 18,
        color: Colors.slate
    },
    settingsWrapper:{
        marginLeft: 'auto',
        marginRight: 20
    },
    settings: {
        height: 20,
        width: 20
    }
})