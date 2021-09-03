import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const mock = require('../../assets/MOCK_DATA.json')

for (const i of mock) {
  console.log(i)
}

export default function ViewRecord({setApp}) {
  const [infoComp, setinfoComp] = useState(false)
  const [id, setid] = useState(0)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Records\n'}</Text>

      {/* <ScrollView
      showsVerticalScrollIndicator={false}
      >

        {
          data.map((rec) => {
            return rec.paid ?
              rec.youOwe === 'me' ?
                <Text key={rec.id}>{`${rec.id + 1}: I paid ${rec.name} ${rec.thing}\n`}</Text>
              :
                <Text key={rec.id}>{`${rec.id + 1}: ${rec.name} paid me ${rec.thing}\n`}</Text>
            :  
            rec.youOwe == 'me' ?
              <Text key={rec.id}>{`${rec.id + 1}: I owe ${rec.name} ${rec.thing} because ${rec.reason}\n`}</Text>
            :
              <Text key={rec.id}>{`${rec.id + 1}: ${rec.name} owes me ${rec.thing} because ${rec.reason}\n`}</Text>
          })
        }

      </ScrollView> */}
      <Text style={styles.header}>Dues To Be Paid</Text>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >

        {
          mock.map((rec) => {
            return !rec.paid ?
            rec.youOwe == true ?
              <Text onPress={() => {setinfoComp(true); setid(rec.id)}} style={{textAlign: 'center'}}key={rec.id}>{`I owe ${rec.name} ${rec.thing} because ${rec.reason}\n`}</Text>
              :
              <Text onPress={() => {setinfoComp(true); setid(rec.id)}} style={{textAlign: 'center'}}key={rec.id}>{`${rec.name} owes me ${rec.thing} because ${rec.reason}\n`}</Text>
            :
            null
          })
        }

      </ScrollView>
      <Text style={styles.header}>Paid Dues</Text>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >

        {
          mock.map((rec) => {
            return rec.paid ?
              rec.youOwe === true ?
                <Text onPress={() => {setinfoComp(true); setid(rec.id)}} style={{textAlign: 'center'}}key={rec.id}>{`I paid ${rec.name} ${rec.thing}\n`}</Text>
                :
                <Text onPress={() => {setinfoComp(true); setid(rec.id)}} style={{textAlign: 'center'}}key={rec.id}>{`${rec.name} paid me ${rec.thing}\n`}</Text>
              :
              null
          })
        }

      </ScrollView>
      <Button 
          title="Done"
          onPress={
            () => {
              setApp('Front')
            }
          }
      />
      {
        infoComp ?
        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', width: '100%', height: '120%', bottom: 0}}>
          <View style={{backgroundColor: 'black', width: '90%', height: '80%', left: '5%', top: '13%' , position: 'absolute', padding: 50}}>
            <Text style={{textAlign: 'center', color: 'white'}} onPress={() => setinfoComp(false)}>Done</Text>
          </View>
        </View> :
        null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 50,
    flex: 1
  },
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
  header: {
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  }
});