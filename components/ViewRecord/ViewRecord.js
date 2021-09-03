import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';



export default function ViewRecord({setApp}) {
  const data = [
    {id: 0, whoOwe: "someone" , name: 'ned', thing: 'a boat', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 1, whoOwe: "someone" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 2, whoOwe: "someone" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 3, whoOwe: "someone" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 4, whoOwe: "me" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 5, whoOwe: "me" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 6, whoOwe: "me" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 7, whoOwe: "me" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 8, whoOwe: "me" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 9, whoOwe: "me" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 10, whoOwe: "me" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 11, whoOwe: "me" , name: 'ned', thing: 'a space ship', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 12, whoOwe: "me" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 13, whoOwe: "me" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 14, whoOwe: "me" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 15, whoOwe: "me" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 16, whoOwe: "me" , name: 'ned', thing: '$50', paid: true, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 17, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 18, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 19, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 20, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 21, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 22, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 23, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 24, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 25, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 26, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 27, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 28, whoOwe: "me" , name: 'ned', thing: '$5000', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 29, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 30, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 31, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 32, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    {id: 33, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    // {id: 34, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    // {id: 35, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    // {id: 36, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    // {id: 37, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    // {id: 38, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    // {id: 39, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    // {id: 40, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
    // {id: 41, whoOwe: "me" , name: 'ned', thing: '$50', paid: false, reason: 'i lost a bet', startDate: '9/7/22' },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Records\n'}</Text>

      {/* <ScrollView
      showsVerticalScrollIndicator={false}
      >

        {
          data.map((rec) => {
            return rec.paid ?
              rec.whoOwe === 'me' ?
                <Text key={rec.id}>{`${rec.id + 1}: I paid ${rec.name} ${rec.thing}\n`}</Text>
              :
                <Text key={rec.id}>{`${rec.id + 1}: ${rec.name} paid me ${rec.thing}\n`}</Text>
            :  
            rec.whoOwe == 'me' ?
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
          data.map((rec) => {
            return !rec.paid ?
            rec.whoOwe == 'me' ?
              <Text style={{textAlign: 'center'}}key={rec.id}>{`I owe ${rec.name} ${rec.thing} because ${rec.reason}\n`}</Text>
              :
              <Text style={{textAlign: 'center'}}key={rec.id}>{`${rec.name} owes me ${rec.thing} because ${rec.reason}\n`}</Text>
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
          data.map((rec) => {
            return rec.paid ?
              rec.whoOwe === 'me' ?
                <Text style={{textAlign: 'center'}}key={rec.id}>{`I paid ${rec.name} ${rec.thing}\n`}</Text>
                :
                <Text style={{textAlign: 'center'}}key={rec.id}>{`${rec.name} paid me ${rec.thing}\n`}</Text>
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