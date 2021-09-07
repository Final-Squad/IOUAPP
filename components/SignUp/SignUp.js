import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Share } from 'react-native';
import { useToast } from "react-native-toast-notifications";




export default function SignUp({setApp}) {
  const [firstName, setFirstName] = React.useState("");
  const [verify, setVerify] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [ready, setReady] = React.useState(true)
  const [verified, setVerified] = React.useState(true)



  const payload = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    verficationPass: verify,

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
      <Text style={styles.title}>Sign up for IOUapp</Text>

      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder={ready ? "Your First Name" : 'Please enter an First Name!'}
        placeholderTextColor={ready ? 'black' : 'red'}
        textContentType='emailAddress'
      />

      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder={ready ? "Your Last Name" : 'Please enter an Last Name!'}
        placeholderTextColor={ready ? 'black' : 'red'}
        textContentType='emailAddress'
      />

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
        textContentType='password'
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        onChangeText={setVerify}
        value={verify}
        placeholder={ready ? "Verfy Password" : 'Words aren`t the same!'}
        placeholderTextColor={ready ? 'black' : 'red'}
        textContentType='password'
        secureTextEntry={true}
      />

      <Button
      title={'Sign Up!'}
      onPress={async () => {
        setVerified(password === verify)
        if (email && password && verify && firstName && lastName) {
          if (!verified) {
            toast.show("Passwords arent the same")
          } else {

            pl = JSON.stringify(payload);
            // database stuff goes here

            setReady(true)
            setApp('Front');
          }
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