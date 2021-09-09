import { StyleSheet } from 'react-native';

const accentColor = '#FF6262';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    paddingLeft: 5,
  },
  input: {
    height: 40,
    width: 300,
    marginBottom: 7,
    marginTop: 7,
    borderWidth: 1,
    padding: 10,
    borderRadius: 2.5,
    borderColor: 'black',
  },
  inputErr: {
    height: 40,
    width: 300,
    marginBottom: 7,
    marginTop: 7,
    borderWidth: 1,
    padding: 10,
    borderRadius: 2.5,
    borderColor: accentColor,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
    height: 40,
    width: 300,
    display: 'flex',
    flexDirection: 'row',
  },
});

export default styles;
