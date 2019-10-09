// import { Colors } from "../../../shared/helpers/colors";

import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 'auto',
        backgroundColor: 'white'
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingBottom: 5,
        paddingTop: 15,
    },
    itemImage: {
        height: 20,
        resizeMode: 'contain'
    },
    itemTitle: {
        fontSize: 12,
        paddingTop: 7,
        paddingBottom: 7,
        // color: Colors.footerTextColor
    },
    itemTitleSelected: {
        // color: Colors.slate
    },
    selectedSeparator: {
        // backgroundColor: Colors.slate,
        width: '70%',
        height: 4,
        borderRadius: 30,
    },
    notVisible:{
        width: 0
    }
});