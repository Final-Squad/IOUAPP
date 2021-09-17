import React, {useState, useMemo, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Share } from 'react-native';
import { UserContext } from '../../Contexts/AppContext';


const mock = require('../../assets/MOCK_DATA.json')
const date = new Date()


export default function ViewRecord({setApp}) {
  const [paid, setpaid] = useState(false)
  const [OweFilter, setOweFilter] = useState(true)
  const {user} = useContext(UserContext)


  useEffect(() => {
    setpaid(false)
    return ;
  }, [paid])


  const Card = ({obj}) => {
    return (
      <View style={styles.card}>
        <View style={{paddingVertical: 30}}>
          { !obj.paid ?
            obj.youOwe ? <Text style={styles.cardHeader}>I owe {obj.name}</Text> : <Text style={styles.cardHeader}>{obj.name} owes me</Text>
          :
            obj.youOwe ? <Text style={styles.cardHeader}>I paid {obj.name}</Text> : <Text style={styles.cardHeader}>{obj.name} paid me</Text>
        }
        </View>
         <Text style={styles.cardText}>{`Name: ${obj.name}`}</Text>
        <Text style={styles.cardText}>{`Awaited Item: ${obj.thing}`}</Text>
        <Text style={styles.cardText}>{`Waiting Since: ${obj.startDate}`}</Text>
        {obj.paid ? <Text style={styles.cardText}>{`Paid on: ${obj.endDate}`}</Text> : null}


        <View style={styles.buttonContainers}>
          {!obj.paid && <Text color='black' style={[styles.cardText, styles.cardButtons, styles.paidbutt]} onPress={() => {obj.paid = true; obj.endDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`; setpaid(true)}}>Paid?</Text>}
          {!obj.paid && <Text
          color='black'
          style={[styles.cardText, styles.cardButtons, styles.reminderbutt]}
          onPress={async () => {
            await Share.share({
              message: obj.youOwe ? `Hey ${obj.name} i havent forgotten about the ${obj.thing}` :  `Hey ${obj.name}, dont forget to give me the ${obj.thing}`
            })
          }}
          >Send Reminder</Text>}
        </View>

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
    backgroundColor: 'white',
    borderWidth: .5,
    width: 350,
    height: 250,
    margin: 10,
    borderRadius: 25,
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: .4
  },
  cardText: {
    textAlign: 'center', 
    fontSize: 18
  },
  cardHeader: {
    textAlign: 'center',
    fontSize: 30,
  },
  cardButtons: {
    fontSize: 20,
    textAlign: 'center',
    padding: 8,
    margin: 5,
    marginTop: 10,
    color: 'white'
  },
  paidbutt: {
    backgroundColor: 'green',
  },
  reminderbutt: {
    backgroundColor: 'purple',
  },
  buttonContainers: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});