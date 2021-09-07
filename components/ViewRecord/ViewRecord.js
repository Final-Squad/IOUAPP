import React, {useState, useMemo} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Share } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const mock = require('../../assets/MOCK_DATA.json')
const date = new Date()

function getObj(id) {
  return mock.filter((i) => {
    return i.id===id
  })[0]
}



export default function ViewRecord({setApp}) {
  const [infoComp, setinfoComp] = useState(false)
  const [id, setid] = useState(0)
  const [paid, setpaid] = useState(false)


  const infoView = () => {
    console.log(id)
    if (paid) {
      setpaid(false)
    }
    const obj = getObj(id);


    return (
    <View style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', width: '100%', height: '120%', bottom: 0}}>
      <View style={{backgroundColor: 'black', width: '90%', height: '80%', left: '5%', top: '13%' , position: 'absolute', padding: 50}}>
        <Text style={{textAlign: 'center', color: 'white'}}>Title: {obj.youOwe ? `I owe ${obj.name}` : `${obj.name} owes me`}</Text>

        <Text style={{textAlign: 'center', color: 'white'}}>{`Name: ${obj.name}`}</Text>
        <Text style={{textAlign: 'center', color: 'white'}}>{`Awaited Item: ${obj.thing}`}</Text>
        <Text style={{textAlign: 'center', color: 'white'}}>{`Waiting Since: ${obj.startDate}`}</Text>
        {obj.paid ? <Text style={{textAlign: 'center', color: 'white'}}>{`Paid on: ${obj.endDate}`}</Text> : null}

        {/* db code for mark as paid */}

        {!obj.paid && <Button style={{textAlign: 'center', color: 'white'}} title='Mark as Paid?' onPress={() => {obj.paid = true; obj.endDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`; setpaid(true); console.log("obj ->", obj)}}/>}
        <Button style={{textAlign: 'center', color: 'white'}} onPress={() => setinfoComp(false)} title='Done'/>
        {!obj.paid && <Button
        title={'Send them a reminder'}
        onPress={async () => {
          await Share.share({
            message: obj.youOwe ? `Hey ${obj.name} i havent forgotten about the ${obj.thing}` :  `Hey ${obj.name}, dont forget to give me the ${obj.thing}`
          })
        }}
        />}
      </View>
    </View>
    )
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Records\n'}</Text>
      <Text style={styles.header}>Dues To Be Paid</Text>
      <ScrollView
      showsVerticalScrollIndicator={false}
      style={{paddingHorizontal: 20}}
      >
        {
          mock.map((rec) => {
            return !rec.paid ?
            rec.youOwe == true ?
              <Text onPress={() => {setinfoComp(true); setid(rec.id)}} style={{}} key={rec.id}>{`I owe ${rec.name} ${rec.thing} because ${rec.reason}\n`}</Text>
              :
              <Text onPress={() => {setinfoComp(true); setid(rec.id)}} style={{}} key={rec.id}>{`${rec.name} owes me ${rec.thing} because ${rec.reason}\n`}</Text>
            :
            null
          })
        }
      </ScrollView>
      <Text style={styles.header}>Paid Dues</Text>
      <ScrollView
      showsVerticalScrollIndicator={false}
      style={{paddingHorizontal: 20}}
      >
        {
          mock.map((rec) => {
            return rec.paid ?
              rec.youOwe === true ?
                <Text onPress={() => {setinfoComp(true); setid(rec.id)}} style={{}} key={rec.id}>{`I paid ${rec.name} ${rec.thing}\n`}</Text>
                :
                <Text onPress={() => {setinfoComp(true); setid(rec.id)}} style={{}} key={rec.id}>{`${rec.name} paid me ${rec.thing}\n`}</Text>
              :
              null
          })
        }

      </ScrollView>
      <Button 
          color='black'
          title="Done"
          onPress={
            () => {
              setApp('Front')
            }
          }
      />
      {
        infoComp && infoView()
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