import { StyleSheet } from 'react-native';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  button: {
    
  },
  socialButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 32,
    marginTop: 10
  },
  googleButton: {
    width: '100%',
    height: 48,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: 'rgba(62, 74, 89, 0.07)',
    shadowOpacity: 0.8,
    elevation: 3,
    shadowRadius: 15,
    shadowOffset: {width: 0.5, height: 3},
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 8,
    flex: 1,
  },
});

export default styles;