import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Share } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const date = new Date()

export default function CreateRecords({setApp}) {
  const [name, setName] = React.useState("");
  const [things, setThings] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [ready, setReady] = React.useState(false)

  const [youOwe, setyouOwe] = useState(true);
  const payload = {
    youOwe: youOwe,
    name: name,
    thing: things,
    reason: reason,
    startDate: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
    endDate: null,
    paid: false
  }

  let pl = null



  return (
    <View>
      <Text style={styles.title}>Login</Text>
  
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Please enter an email"
      />
  
      <TextInput
        style={styles.input}
        onChangeText={setThings}
        value={things}
        placeholder="password"
      />


      <Button 
        title={'Sign In'}
        onPress={() => {
          if (name && things && reason) {
            setReady(true)
            setApp('View');
            pl = JSON.stringify(payload);
          } else {
            setReady(false);
            console.log('Not all forms are filled');
          }
        }}
      />

      <Button
      title={'Sign Up'}
      onPress={async () => {
        if (name && things && reason) {
          pl = JSON.stringify(payload);
          setReady(true)

          await Share.share({
            message: 'Hey, this was sent from the app,\n' + pl
          });
          setApp('View');
        } else {
          setReady(false);
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