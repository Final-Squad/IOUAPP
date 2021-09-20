import { StyleSheet } from 'react-native';

const accentColor = '#FF6262';
const inputWidth = 300;

const styles = StyleSheet.create({
  container: {
    height: 350,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    width: inputWidth,
    fontSize: 30,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
    paddingLeft: 5,
    color: 'white'
  },
  input: {
    height: 40,
    width: inputWidth,
    marginBottom: 7,
    marginTop: 7,
    borderWidth: 1,
    padding: 10,
    borderRadius: 2.5,
    borderColor: 'white',
    color: 'white'
  },
  inputErr: {
    height: 40,
    width: inputWidth,
    marginBottom: 7,
    marginTop: 7,
    borderWidth: 1,
    padding: 10,
    borderRadius: 2.5,
    borderColor: accentColor,
    opacity: .7,
    color: 'white'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
    height: 40,
    width: inputWidth,
    display: 'flex',
    flexDirection: 'row',
    color: 'white'
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: inputWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iou: {
    fontSize: 50,
    color: 'white'
  },
  app: {
    color: 'red',
    fontSize: 50,
    opacity: 1,
  }
});

export default styles;
