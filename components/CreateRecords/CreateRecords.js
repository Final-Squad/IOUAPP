import React, {useReducer, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Share } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useToast } from "react-native-toast-notifications";


const date = new Date()


export default function CreateRecords({setApp}) {
  const [otherEmail, setOtherEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [ready, setReady] = React.useState(true)

  const [youOwe, setyouOwe] = useState(true);

  const payload = {
    payer: youOwe ? user.email : otherEmail,
    receiver: !youOwe ? otherEmail : user.email,
    reason: reason,
    amount: amount
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
      <Text style={styles.title}>Create A New Record</Text>
      <Picker
        selectedValue={youOwe}
        style={{ width: 300 }}
        onValueChange={(itemValue, itemIndex) => setyouOwe(itemValue)}
      >
        <Picker.Item label="I owe Someone" value={true} />
        <Picker.Item label="Someone owes Me" value={false} />
      </Picker>

      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholderTextColor={ready ? 'black' : 'red'}
        placeholder={ready ? "Name of the person you owe/owes you." : 'Please enter a name!'}
      />

      <TextInput
        style={styles.input}
        onChangeText={setThings}
        value={things}
        placeholderTextColor={ready ? 'black' : 'red'}
        placeholder={ready ? "What is owed?" : 'Please enter the item that is owed!'}
      />

      <TextInput
        style={styles.input}
        onChangeText={setReason}
        value={reason}
        placeholderTextColor={ready ? 'black' : 'red'}
        placeholder={ready ? "What is the Reason?" : 'Please enter a reason!'}
      />

      <View style={styles.buttons}>
        <Button
          color='black'
          title={'Save'}
          onPress={() => {
            if (name && things && reason) {
              // database stuff goes here
              setReady(true)
              setApp('View');
              pl = JSON.stringify(payload);
            } else {
              setReady(false);
              toast.show("Not all fields have been filled, please fill them in.", alertConfig)
              console.log('Not all forms are filled');
            }
          }}
        />

        <Button
          color='black'
          title={'Back'}
          onPress={() => {
              setApp('Front');
          }}
        />

        <Button
        color='black'
        title={'Share & Save'}
        onPress={async () => {
          if (name && things && reason) {
            await Share.share({
              message: 'Hey, this was sent from the app,\n' + pl
            });
            // database stuff goes here
            pl = JSON.stringify(payload);
            setReady(true)
            setApp('View');
          } else {
            setReady(false);
            toast.show("Not all fields have been filled, please fill them in.", alertConfig)
            console.log('Not all forms are filled');
          }
        }}
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
    flexDirection: 'row',
    justifyContent: 'center'
  }
});