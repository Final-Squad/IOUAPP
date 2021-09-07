import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Share } from 'react-native';
import { useToast } from "react-native-toast-notifications";




export default function Login({setApp}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [ready, setReady] = React.useState(true)


  const payload = {
    email: email,
    password: password
  }

  let pl = null
  const toast = useToast();
  const alertConfig = {
    type: 'danger',
    placement: "top",
    duration: 3000,
    animationType: 'zoom-in'
  }




  return (
    <View>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder={ready ? "Your Email" : 'Please enter an Email!'}
        placeholderTextColor={ready ? 'black' : 'red'}
        textContentType='emailAddress'
      />
  
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder={ready ? "Your Password" : 'Please enter a valid Password!'}
        placeholderTextColor={ready ? 'black' : 'red'}
        textContentType={'password'}
        secureTextEntry={true}
      />

      <Button 
        title={'Log In'}
        onPress={() => {
          if (email && password) {
            setReady(true)
            setApp('Front');
            pl = JSON.stringify(payload);
          } else {
            setReady(false);
            toast.show("Not all fields have been filled, please fill them in.", alertConfig)
            console.log('Not all forms are filled');
          }
        }}
      />

      <Button
      title={'Sign Up!'}
      onPress={async () => {
        if (email && password) {
          pl = JSON.stringify(payload);
          // database stuff goes here

          setReady(true)
          setApp('SignUp');
        } else {
          setReady(false);
          toast.show("Not all fields have been filled, please fill them in.", alertConfig)
          console.log('Not all forms are filled');
        }
      }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});