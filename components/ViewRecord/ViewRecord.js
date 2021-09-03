import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const data = [
  {WhoOwesWho: "Someone" , name: 'ned', owes: '$50', paid: false, },
  {},
  {},
  {},
  {},
  {}
]

export default function ViewRecord() {
  const [name, onChangeName] = React.useState("");
  const [things, onChangeThings] = React.useState("");
  const [reason, onChangeReason] = React.useState("");
  // const [text, onChangeText] = React.useState("Name");

  const [selectedValue, setSelectedValue] = useState("Me");
  return (
    <View>
      <Text style={styles.title}>View Records</Text>



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