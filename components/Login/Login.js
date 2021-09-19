import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../styles';
import { login } from '../../api';
import { UserContext } from '../../Contexts/AppContext';

export default function Login({setApp}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(true);
  const {user, setUser} = useContext(UserContext);
  const testUser = {
    test: true,
    user: {
      firstName: "John",
      lastName: "Doe",
      email: "doe@gmail.com"
    }
  }

  const apiLoginUser = async () => {
    if (email && password) {
      const logged = await login(email, password)
      setUser(logged);
    } else {
      setReady(false);
    }
  }

  useEffect(() => {
    if (user && user.test) {
      setReady(true);
    }
    else if (user && user.user) {
      setReady(true);
      setApp('Front');
    } else if (user && user.error) {
      setPassword("");
      setReady(false);
      setUser(null);
    }
  }, [user]);

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
          title={'Sign Up'}
          onPress={() => {
            setApp('SignUp');
          }}
        />
        <Button
          color='black'
          title="Test"
          onPress={async () => {
              await setUser(testUser);
              setApp('Front');
            }
          }
      />
      </View>
    </View>
  );
}
