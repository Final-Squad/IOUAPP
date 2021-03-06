import React, { useState, useContext} from 'react';
import { Text, View, Button, TextInput, Share } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useToast } from "react-native-toast-notifications";
import { createDebtcard } from '../../api';
import { UserContext } from '../../Contexts/AppContext';
import styles from '../styles';

export default function CreateRecords({setApp}) {
  const [otherEmail, setOtherEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [ready, setReady] = React.useState(true);
  const {user} = useContext(UserContext)

  const [youOwe, setyouOwe] = useState(true);
  let payer = null;
  let receiver = null;

  if (youOwe) {
    payer = user.user.email;
    receiver = otherEmail;
  } else {
    payer = otherEmail;
    receiver = user.user.email;
  }

  const payload = {
    payer,
    receiver,
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
        style={{ width: 300}}
        onValueChange={(itemValue, itemIndex) => {
          setyouOwe(itemValue);
        }}
      >
        <Picker.Item color='white' label="I owe Someone" value={true} />
        <Picker.Item color='white' label="Someone owes Me" value={false} />
      </Picker>

      <TextInput
        style={styles.input}
        onChangeText={setOtherEmail}
        value={otherEmail}
        placeholderTextColor={ready ? 'white' : 'red'}
        placeholder={ready ? "Email/Name of person you owe/owes you." : 'Please enter the Name or Email!'}
      />

      <TextInput
        style={styles.input}
        type
        onChangeText={setReason}
        value={reason}
        placeholderTextColor={ready ? 'white' : 'red'}
        placeholder={ready ? "Reason" : 'Please enter a reason!'}
      />

      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        placeholderTextColor={ready ? 'white' : 'red'}
        placeholder={ready ? "Item That is Owed/Amount" : 'Please enter the Item that is owed!'}
      />

      <View style={styles.buttons}>
        <Button
          color='white'
          title={'Save'}
          onPress={async () => {
            if (otherEmail && reason && amount) {
              await createDebtcard(
                payload.payer, payload.receiver,
                payload.reason, payload.amount
              );
              setReady(true)
              setApp('View');
            } else {
              setReady(false);
              toast.show("Missing fields", alertConfig)
            }
          }}
        />

        <Button
          color='white'
          title={'Back'}
          onPress={() => {
              setApp('Front');
          }}
        />

        <Button
        color='white'
        title={'Share & Save'}
        onPress={() => {
          if (otherEmail && reason && amount) {
            createDebtcard(
              payload.payer, payload.receiver,
              payload.reason, payload.amount
            ).then(() => {
              Share.share({
                message: `Reminder to send ${user.user.firstName} ${amount}`
              }).then(() => {
                setReady(true)
                setApp('View');
              }).catch(() => {
                toast.show("Error: Try sharing again", alertConfig)
              });
            })

          } else {
            setReady(false);
            toast.show("Missing fields", alertConfig)
          }
        }}
        />
      </View>
    </View>
  );
}
