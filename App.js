import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import Splash from './components/Splash/Splash';
import Front from './components/Front/Front';
import CreateRecords from './components/CreateRecords/CreateRecords';
import ViewRecord from './components/ViewRecord/ViewRecord';
import { ToastProvider } from 'react-native-toast-notifications';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [appState, setappState] = useState('Front')

  

  return (
    <ToastProvider offsetTop={100}
    textStyle={{ fontSize: 30 }}>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={0}>
          {
            appState === 'Front' && <Front setApp={setappState}/> ||
            appState === 'Create' && <CreateRecords setApp={setappState}/> ||
            appState === 'View' && <ViewRecord setApp={setappState}/>
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
