import { StyleSheet } from 'react-native';
import * as RNLocalize from "react-native-localize";

const isRTL = RNLocalize.getLocales()[0];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,

  },
  title: {
    textAlign: isRTL ? 'left' : 'right',
    fontSize: 32,
  },
  text: {
    textAlign: isRTL ? 'left' : 'right',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;