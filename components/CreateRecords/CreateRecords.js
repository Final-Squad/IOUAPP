import React, {useReducer, useState, useContext} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Share } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useToast } from "react-native-toast-notifications";
import { createDebtcard } from '../../api';
import { UserContext } from '../../Contexts/AppContext';


export default function CreateRecords({setApp}) {
  const [otherEmail, setOtherEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [ready, setReady] = React.useState(true);
  const {user} = useContext(UserContext)

  const [youOwe, setyouOwe] = useState(true);

  const payload = {
    payer: youOwe ? user.email : otherEmail,
    receiver: !youOwe ? otherEmail : user.email,
    reason: reason,
    amount: amount
  }

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
        onChangeText={setOtherEmail}
        value={otherEmail}
        placeholderTextColor={ready ? 'black' : 'red'}
        placeholder={ready ? "Email of the person you owe/owes you." : 'Please enter the eamil!'}
      />

      <TextInput
        style={styles.input}
        type
        onChangeText={setReason}
        value={reason}
        placeholderTextColor={ready ? 'black' : 'red'}
        placeholder={ready ? "Reason" : 'Please enter a reason!'}
      />

      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        placeholderTextColor={ready ? 'black' : 'red'}
        placeholder={ready ? "Amount" : 'Please enter the amount!'}
      />

      <View style={styles.buttons}>
        <Button
          color='black'
          title={'Save'}
          onPress={async () => {
            if (otherEmail && reason && amount) {
              console.log("PAYLOAD", payload);
              const debtCard = await createDebtcard(
                payload.payer, payload.receiver,
                payload.reason, payload.amount
              );
              setReady(true)
              setApp('View');
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
          if (otherEmail && reason && amount) {
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