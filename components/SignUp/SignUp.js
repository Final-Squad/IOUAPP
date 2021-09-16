import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Share } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import { createUser } from '../../api';



export default function SignUp({setApp, loggedUser, setloggedUser}) {
  const [firstName, setFirstName] = React.useState("");
  const [verify, setVerify] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState(loggedUser);


  const [ready, setReady] = React.useState(true)
  const [verified, setVerified] = React.useState(true)



  const payload = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    verficationPass: verify,

  }

  const apiCreateUser = async () => {
    setVerified(password === verify)
    if (email && password && verify && firstName && lastName) {
      if (!verified) {
        toast.show("Passwords arent the same")
        setReady(false);
      } else {
        setUser(await createUser(firstName, lastName, email, password));
      }
    } else {
      setReady(false);
      toast.show("Not all fields have been filled, please fill them in.", alertConfig)
    }
  }

  useEffect(() => {
    if (user && user.user) {
      setloggedUser(user)
      setReady(true);
      setApp('Front');
    } else if (user && user.error) {
      setReady(false);
      setUser(null);
      toast.show(user.error, alertConfig);
    }
  }, [user])

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
        placeholder={ready ? "Verfy Password" : 'Words aren`t the same!'}
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

      <View style={styles.buttons}>
        <Button
        color='black'
        title={'Sign Up!'}
        onPress={async () => await apiCreateUser()}/>
          <Button 
            color='black'
            title="Back"
            onPress={
              () => {
                setApp('Login')
              }
            }
        />
      </View>
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
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'row',
  }
});