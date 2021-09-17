import React, {useState, useMemo, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Share } from 'react-native';
import { getDebtcardForUserByDebtType, getUser, updatePaymentForDebtcard } from '../../api';
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

  const Card = async ({debtCard, youOwe, paid}) => {
    const otherPerson = await getUser(youOwe ? debtCard.receiver : debtCard.payer);

    const notificationMsg = {
      message: youOwe
        ? `Hey ${otherPerson.firstName}I haven't forgotten about the $${debtCard.amount}`
        : `Hey ${otherPerson.firstName}, don't forget to send me the $${debtCard.amount}`
    }

    const whoOwesWho = youOwe && !paid ? `I owe ${otherPerson.firstName}` : `${otherPerson.firstName} owes me`;
    const whoPaidWho = youOwe && paid ? `I paid ${otherPerson.firstName}` : `${otherPerson.firstName} paid me`;

    return (
      <View style={styles.card}>
        <Text style={styles.cardName}>{paid ? whoPaidWho : whoOwesWho}</Text>
        <View style={styles.cardInfo}>
          <Text>{`Name: ${otherPerson.firstName} ${otherPerson.lastName}`}</Text>
          <Text>{`Amount: ${debtCard.amount}`}</Text>
          <Text>{`Date: ${debtCard.createdAt}`}</Text>
        </View>
        {
          paid
          ?
          <View style={styles.buttonContainers}>
            <Text
              onPress={ async () => await updatePaymentForDebtcard(debtCard.id, true) }
              style={[styles.cardButtons, styles.paidbutt]}
            >Paid?</Text>
            <Text
              onPress={async () => await Share.share(notificationMsg)}
              style={[styles.cardButtons, styles.reminderbutt]}

            >Send Reminder</Text>
          </View>
          :
          null
        }
      </View>
    );
  }

  /**
   * get debtCard by types
   * @param {*} debtCardType payer || receiver
   * @returns debtCards
   */
  const cards = async (debtCardType) => {
    const debtCards = await getDebtcardForUserByDebtType(user.email, debtCardType);
    return debtCards.debtCards.map((debtCard) => {
      return (
        <Card
          debtCard={debtCard}
          youOwe={debtCard.payer === user.email}
          paid={debtCard.paid}
        ></Card>
      );
    });
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
          style={styles.scrollView}
        >{ cards('payer') }</ScrollView>
      </View >

      <Text style={styles.header}>Paid Dues</Text>
      <View style={{ paddingHorizontal: 20 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal={true}
          style={styles.scrollView}
        >{ cards('receiver') }</ScrollView>
      </View>

      <Button
        color='black'
        title="Done"
        onPress={ () => setApp('Front') }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardName: {
    textAlign: 'center',
    fontSize: 30
  },
  cardInfo: {
    textAlign: 'center',
    fontSize: 18
  },
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