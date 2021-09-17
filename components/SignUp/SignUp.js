import React, {useState, useEffect, useContext} from 'react';
import { Text, View, Button, TextInput, ScrollView, Share } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import { createUser } from '../../api';
import styles from '../styles';
import { UserContext } from '../../Contexts/AppContext';

export default function SignUp({setApp}) {
  const [firstName, setFirstName] = React.useState("");
  const [verify, setVerify] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [ready, setReady] = React.useState(true)
  const [verified, setVerified] = React.useState(true)

  const {user, setUser} = useContext(UserContext)

  const apiCreateUser = async () => {
    setVerified(password === verify)
    if (email && password && verify && firstName && lastName) {
      if (!verified) {
        toast.show("Passwords don't match");
        setReady(false);
      } else {
        setUser(await createUser(firstName, lastName, email, password));
      }
    } else {
      setReady(false);
      toast.show("Missing fields", alertConfig);
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

  const toast = useToast();
  const alertConfig = {
    type: 'danger',
    placement: "top",
    duration: 3000,
    animationType: 'zoom-in'
  }

  return (
    <View>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={ready ? styles.input : styles.inputErr }
        onChangeText={setFirstName}
        value={firstName}
        placeholder={"First Name"}
        placeholderTextColor={ready ? 'black' : 'red'}
        textContentType='emailAddress'
      />

      <TextInput
        style={ready ? styles.input : styles.inputErr }
        onChangeText={setLastName}
        value={lastName}
        placeholder={"Last Name"}
        placeholderTextColor={ready ? 'black' : 'red'}
        textContentType='emailAddress'
      />

      <TextInput
        style={ready ? styles.input : styles.inputErr }
        onChangeText={setEmail}
        value={email}
        placeholder={"Email"}
        placeholderTextColor={ready ? 'black' : 'red'}
        textContentType='emailAddress'
      />

      <TextInput
        style={ready ? styles.input : styles.inputErr }
        onChangeText={setPassword}
        value={password}
        placeholder={"Password"}
        placeholderTextColor={ready ? 'black' : 'red'}
        textContentType='password'
        secureTextEntry={true}
      />
      <TextInput
        style={ready ? styles.input : styles.inputErr }
        onChangeText={setVerify}
        value={verify}
        placeholder={"Verfy Password"}
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
