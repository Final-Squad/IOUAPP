import React, {useState, useMemo, useEffect} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Share } from 'react-native';

const mock = require('../../assets/MOCK_DATA.json')
const date = new Date()


export default function ViewRecord({setApp}) {
  const [paid, setpaid] = useState(false)
  const [OweFilter, setOweFilter] = useState(true)


  useEffect(() => {
    setpaid(false)
    return ;
  }, [paid])


  const Card = ({obj}) => {
    return (
      <View style={styles.card}>
        <View style={{paddingVertical: 30}}>
          { !obj.paid ?
            obj.youOwe ? <Text style={{color: 'white', textAlign: 'center', fontSize: 30}}>I owe {obj.name}</Text> : <Text style={{color: 'white', textAlign: 'center', fontSize: 30}}>{obj.name} owes me</Text>
          :
            obj.youOwe ? <Text style={{color: 'white', textAlign: 'center', fontSize: 30}}>I paid {obj.name}</Text> : <Text style={{color: 'white', textAlign: 'center', fontSize: 30}}>{obj.name} paid me</Text>
        }

          
        </View>
         <Text style={{textAlign: 'center', color: 'white'}}>{`Name: ${obj.name}`}</Text>
        <Text style={{textAlign: 'center', color: 'white'}}>{`Awaited Item: ${obj.thing}`}</Text>
        <Text style={{textAlign: 'center', color: 'white'}}>{`Waiting Since: ${obj.startDate}`}</Text>
        {obj.paid ? <Text style={{textAlign: 'center', color: 'white'}}>{`Paid on: ${obj.endDate}`}</Text> : null}


        {!obj.paid && <Button style={{textAlign: 'center', color: 'white'}} title='Mark as Paid?' onPress={() => {obj.paid = true; obj.endDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`; setpaid(true)}}/>}
        {!obj.paid && <Button
        title={'Send them a reminder'}
        onPress={async () => {
          await Share.share({
            message: obj.youOwe ? `Hey ${obj.name} i havent forgotten about the ${obj.thing}` :  `Hey ${obj.name}, dont forget to give me the ${obj.thing}`
          })
        }}
        />}

      </View>
    )
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Records\n'}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingLeft: '20%', paddingRight: '20%' }}>
        <Text onPress={() => {setOweFilter(true)}} style={[OweFilter && styles.filter, styles.filters]}>Me to You</Text>
        <Text onPress={() => {setOweFilter(false)}} style={[!OweFilter && styles.filter, styles.filters]}>You to Me</Text>
      </View>

      <Text style={styles.header}>Dues To Be Paid</Text>
      <View style={{paddingHorizontal: 20 }}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      horizontal={true}
      style={{ display: 'flex', flexDirection: 'row'}}
      >
        {

          mock.map((rec) => {
            return !rec.paid ?
            rec.youOwe ?
              OweFilter && <Card key={rec.id} obj={rec}/>
              :
              !OweFilter && <Card key={rec.id} obj={rec}/>
            :
            null
          })
        }
      </ScrollView>
      </View >

      <Text style={styles.header}>Paid Dues</Text>
      <View style={{ paddingHorizontal: 20 }}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={true}
        style={{ display: 'flex', flexDirection: 'row'}}
        >
          {
            mock.map((rec) => {
              return rec.paid ?
                rec.youOwe ?
                  OweFilter && <Card key={rec.id} obj={rec}/>
                  :
                  !OweFilter && <Card key={rec.id} obj={rec}/>
                :
                null
            })
          }

        </ScrollView>
      </View>

      <Button 
          color='black'
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
  },
  filter: {
    backgroundColor: 'red'
  },
  filters: {
    padding: '5%'
  },
  card: {
    backgroundColor: 'black',
    width: 350,
    height: 250,
    margin: 10,
  }
});