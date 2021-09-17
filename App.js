import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import Splash from './components/Splash/Splash';
import Front from './components/Front/Front';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import About from './components/About/About';
import CreateRecords from './components/CreateRecords/CreateRecords';
import ViewRecord from './components/ViewRecord/ViewRecord';
import { ToastProvider } from 'react-native-toast-notifications';


export default function App() {
  const [loggedUser, setloggedUser] = useState(null);
  const [appState, setappState] = useState('Splash');

  return (
    <ToastProvider offsetTop={100}
    textStyle={{ fontSize: 30 }}>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={0}>
          {
            appState === 'Splash' && <Splash setApp={setappState}/> ||
            appState === 'About' && <About setApp={setappState}/> ||
            appState === 'SignUp' && <SignUp setApp={setappState} setloggedUser={setloggedUser} /> ||
            appState === 'Login' && <Login setApp={setappState} setloggedUser={setloggedUser} loggedUser={loggedUser}/> ||
            appState === 'Front' && <Front setApp={setappState} setloggedUser={setloggedUser}/> ||
            appState === 'Create' && <CreateRecords setApp={setappState} loggedUser={loggedUser}/> ||
            appState === 'View' && <ViewRecord setApp={setappState} loggedUser={loggedUser}/>
          }
        </KeyboardAvoidingView>
      </ScrollView>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
});
