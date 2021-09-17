import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import styles from '../styles';
import { login } from '../../api';

export default function Login({setApp, loggedUser, setloggedUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(true);
  const [user, setUser] = useState(loggedUser);

  const apiLoginUser = async () => {
    if (email && password) {
      setUser(await login(email, password));
    } else {
      setReady(false);
    }
  }

  useEffect(() => {
    if (user && user.user) {
      console.log("user - >", user);
      setloggedUser(user);
      console.log("LoggedUser - >", loggedUser);
      setReady(true);
      setApp('Front');
    } else if (user && user.error) {
      setPassword("");
      setReady(false);
      setUser(null);
    }
  }, [user])

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.iou}>
          IOU<Text style={styles.app}>APP</Text>
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
              setApp('Front');
            }
          }
      />
      </View>
    </View>
  );
}
