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
import { UserContext } from './Contexts/AppContext';
import { LogBox } from 'react-native';


// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications


export default function App() {
  const [user, setUser] = useState(null);
  const [appState, setappState] = useState('Splash');

  return (
    <UserContext.Provider value={{user, setUser}}>
      <ToastProvider offsetTop={100}
      textStyle={{ fontSize: 30 }}>
        <ScrollView
          contentContainerStyle={styles.container}
        >
          <KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={0}>
            {
              appState === 'Splash' && <Splash setApp={setappState}/> ||
              appState === 'About' && <About setApp={setappState}/> ||
              appState === 'SignUp' && <SignUp setApp={setappState}/> ||
              appState === 'Login' && <Login setApp={setappState}/> ||
              appState === 'Front' && <Front setApp={setappState}/> ||
              appState === 'Create' && <CreateRecords setApp={setappState} user={user}/> ||
              appState === 'View' && <ViewRecord setApp={setappState} user={user}/>
            }
          </KeyboardAvoidingView>
        </ScrollView>
      </ToastProvider>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
});
