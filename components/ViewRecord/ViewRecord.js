import React, {useState, useMemo, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Share } from 'react-native';
import { getDebtcardForUserByDebtType, getUser, getUsersPaidAndPaidDebtcards, updatePaymentForDebtcard } from '../../api';
import { UserContext } from '../../Contexts/AppContext';

export default function ViewRecord({setApp}) {
  const [OweFilter, setOweFilter] = useState(true);
  const [owedDebtCards, setOwedDebtCards] = useState();
  const [paidDebtCards, setPaidDebtCards] = useState();
  const {user} = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      const owedCards = await getDebtcardForUserByDebtType(user.user.email);
      const paidCards = await getUsersPaidAndPaidDebtcards(user.user.email);
      setOwedDebtCards(owedCards);
      setPaidDebtCards(paidCards);
    }
    getData();
  }, []);

  const Card = ({debtCard, youOwe, paid, owedFilterBool}) => {
    const [otherPerson, setOP] = useState({})

    useEffect(() => {
      const useGetter = async () => {
        const otherP = await getUser(youOwe ? debtCard.receiver : debtCard.payer);
        const otherPAfterAwait = otherP.user ? otherP.user : youOwe ? { firstName: debtCard.receiver,lastName: '' } : { firstName: debtCard.payer,lastName: '' };
        setOP(otherPAfterAwait)
      }
      useGetter();
    }, [])

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
          debtCard.payer === user.user.email && debtCard.paid === false
          ?
          <View style={styles.buttonContainers}>
            <Text
              onPress={ async () => {
                await updatePaymentForDebtcard(debtCard.id, true)
              } }
              style={[styles.cardButtons, styles.paidbutt]}
            >Pay</Text>
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

  const DebtCardsByOwedFilter = ({debtCard, isPaid}) => {
    if (OweFilter) {
      if (debtCard.paid === isPaid && debtCard.payer === user.user.email) {
        return (<Card
          key={debtCard.id}
          debtCard={debtCard}
          youOwe={debtCard.payer === user.user.email}
          paid={debtCard.paid}
        />)
      } else {
        return null
      }
    } else if (!OweFilter) {
      if (debtCard.paid === isPaid && debtCard.receiver === user.user.email) {
        return (<Card
          key={debtCard.id}
          debtCard={debtCard}
          youOwe={debtCard.payer === user.user.email}
          paid={debtCard.paid}
        />)
      } else {
        return null
      }
    } else {
      return <Text>{'Nothing Yet!'}</Text>
    }
  }

  /**
   * get debtCard by types
   * @param {*} debtCardType payer || receiver
   * @returns debtCards
   */
  const Cards = ({paid}) => {
    if (owedDebtCards && paid === false) {
      return (
        <>
          { owedDebtCards.map((debtCard) => <DebtCardsByOwedFilter debtCard={debtCard} isPaid={false} />) }
        </>
        )
    } else if (paidDebtCards && paid) {
      return (
        <>
          { paidDebtCards.youPaid.map((debtCard) => <DebtCardsByOwedFilter debtCard={debtCard} isPaid={true} />) }
          { paidDebtCards.youReceived.map((debtCard) => <DebtCardsByOwedFilter debtCard={debtCard} isPaid={true} />) }
        </>
      )
    } else {
      return <Text>Something went wrong!</Text>
    }
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
        >
          <Cards paid={false}/>
        </ScrollView>
      </View >

      <Text style={styles.header}>Paid Dues</Text>
      <View style={{ paddingHorizontal: 20 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal={true}
          style={styles.scrollView}
        >
          <Cards paid={true}/>
        </ScrollView>
      </View>

      <Button
        color='black'
        title="Done"
        onPress={ () => {setApp('Front')} }
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
    height: 150,
    margin: 10,
    borderRadius: 5,
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