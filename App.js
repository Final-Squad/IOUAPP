import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import Splash from './components/Splash/Splash';
import Front from './components/Front/Front';
import CreateRecords from './components/CreateRecords/CreateRecords';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={0}>
          {/* <Splash /> */}
          {/* <Front /> */}
          <CreateRecords />
        </KeyboardAvoidingView>
      </ScrollView>
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
