import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import { useToast } from "react-native-toast-notifications";
import styles from './styles';
import { login } from '../../api';

export default function Login({setApp}) {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(true);

  const toast = useToast();
  const alertConfig = {
    type: 'danger',
    placement: "top",
    duration: 3000,
    animationType: 'zoom-in',
  }

  const apiLoginUser = async () => {
    console.log('before', email, password)

    if (email && password) {
      setUser(await login(email, password));
    } else {
      setReady(false);
      toast.show("Invalid fields", alertConfig);
    }
  }

  useEffect(() => {
    console.log('after', email, password)
    if (user && user.user) {
      setReady(true);
      setApp('Front');
    } else if (user && user.error) {
      setReady(false);
      setUser(null);
      toast.show(user.error, alertConfig);
    }
  }, [user])



  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          IOU<Text style={styles.apps}>APP</Text>
        </Text>
      </View>

      <Text style={styles.title}>Login</Text>
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
        textContentType={'password'}
        secureTextEntry={true}
      />
      <View style={styles.buttons}>
        <Button
          color='black'
          title={'Log In'}
          onPress={async () => await apiLoginUser()}
        />

        <Button
          color='black'
          title={'Sign Up!'}
          onPress={() => {
            setApp('SignUp');
          }}
        />
        <Button 
          color='black'
          title="Test"
          onPress={
            () => {
              setApp('Front')
            }
          }
      />
      </View>
    </View>
  );
}

const jstyles = StyleSheet.create({
  titleContainer: {
    marginBottom: 300,
  },
  title: {
    fontSize: 50,
  },
  apps: {
    color: 'red',
    fontSize: 50,
    opacity: .3
  }
});