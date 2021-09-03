import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateRecords({setApp}) {
  const [name, onChangeName] = React.useState("");
  const [things, onChangeThings] = React.useState("");
  const [reason, onChangeReason] = React.useState("");
  // const [text, onChangeText] = React.useState("Name");

  const [selectedValue, setSelectedValue] = useState("me");

  return (
    <View>
      <Text style={styles.title}>Create A New Record</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ width: 300 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="I owe Someone" value="me" />
        <Picker.Item label="Someone owes Me" value="someone" />
      </Picker>
  
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        clearTextOnFocus={true}
        placeholder={"Name of the person you owe/owes you."}
      />
  
      <TextInput
        style={styles.input}
        onChangeText={onChangeThings}
        value={things}
        clearTextOnFocus={true}
        placeholder={"What is owed?"}
      />

      <TextInput
        style={styles.input}
        onChangeText={onChangeReason}
        value={reason}
        clearTextOnFocus={true}
        placeholder={"What is the Reason?"}
      />
      <Button 
      title={'Save'}
      onPress={() => {
        setApp('View')
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