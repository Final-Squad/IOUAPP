import React, {useState, useMemo, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Share } from 'react-native';
import { deleteDebtcardById, getDebtcardForUserByDebtType, getUser, getUsersPaidAndPaidDebtcards, updatePaymentForDebtcard } from '../../api';
import { UserContext } from '../../Contexts/AppContext';

export default function ViewRecord({setApp}) {
  const [OweFilter, setOweFilter] = useState(true);
  const [owedDebtCards, setOwedDebtCards] = useState();
  const [paidDebtCards, setPaidDebtCards] = useState();
  const {user} = useContext(UserContext);
  const [payState, setPayState] = useState(false)
  const [delState, setDelState] = useState(false)

  useEffect(() => {
    let isSubscribed = true
    const getData = async () => {
      const owedCards = await getDebtcardForUserByDebtType(user.user.email);
      const paidCards = await getUsersPaidAndPaidDebtcards(user.user.email);
      setOwedDebtCards(owedCards);
      setPaidDebtCards(paidCards);
    }
    getData();
    return () => isSubscribed = false
  }, [payState]);

  const Card = ({debtCard, youOwe, paid}) => {
    const [otherPerson, setOP] = useState({})

    useEffect(() => {
      let isSubscribed = true
      const useGetter = async () => {
        const otherP = await getUser(youOwe ? debtCard.receiver : debtCard.payer);
        const otherPAfterAwait = otherP.user ? otherP.user : youOwe ? { firstName: debtCard.receiver,lastName: '' } : { firstName: debtCard.payer,lastName: '' };
        setOP(otherPAfterAwait)
      }
      useGetter();
      return () => isSubscribed = false
    }, [])


    const notificationMsg = {
      message: youOwe
        ? `Hey ${otherPerson.firstName}I haven't forgotten about the $${debtCard.amount}`
        : `Hey ${otherPerson.firstName}, don't forget to send me the $${debtCard.amount}`
    }

    const whoOwesWho = youOwe && !paid ? `I Owe ${otherPerson.firstName}` : `${otherPerson.firstName} Owes Me`;
    const whoPaidWho = youOwe && paid ? `I Paid ${otherPerson.firstName}` : `${otherPerson.firstName} Paid Me`;

    return (
      <View style={styles.card}>
        <Text style={styles.cardName}>{paid ? whoPaidWho : whoOwesWho}</Text>
        <Text style={styles.cardText}>
          <Text style={styles.keyName}>Name: </Text>{otherPerson.firstName} {otherPerson.lastName}</Text>
        <Text style={styles.cardText}><Text style={styles.keyName}>Reason: </Text>{debtCard.reason}</Text>
        <Text style={styles.cardText}><Text style={styles.keyName}>Amount: </Text>{debtCard.amount}</Text>
        <Text style={styles.cardText}><Text style={styles.keyName}>Date: </Text>{`${debtCard.createdAt.split('T')[0]}`}</Text>

        {paid && <Text style={styles.cardText
          }><Text style={styles.keyName}>Paid Date: </Text>{`${debtCard.updatedAt.split('T')[0]}`}</Text>}
        {
          !paid
          ?
          <View style={styles.buttonContainers}>
            <Text
              onPress={ async () => {
                await updatePaymentForDebtcard(debtCard.id, true)
                setPayState(!payState)
              } }
              style={[styles.cardButtons, styles.paidbutt]}
            >Pay</Text>
            <Text
              onPress={ async () => await Share.share(notificationMsg) }
              style={[styles.cardButtons, styles.reminderbutt]}
            >Reminder</Text>
            <Text
              onPress={ async () => { await deleteDebtcardById(debtCard.id); setDelState(!delState) } }
              style={[styles.cardButtons, styles.deleteButt]}
            >Delete</Text>
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
          { owedDebtCards.payers.debtCards.length > 0 ? owedDebtCards.payers.debtCards.map((debtCard) => <DebtCardsByOwedFilter key={debtCard.id} debtCard={debtCard} isPaid={false} />) : <Text style={{color: 'white'}}>Nothing Yet!</Text> }
          { owedDebtCards.receivers.debtCards.length > 0 ?  owedDebtCards.receivers.debtCards.map((debtCard) => <DebtCardsByOwedFilter key={debtCard.id} debtCard={debtCard} isPaid={false} />) : <Text style={{color: 'white'}}>Nothing Yet!</Text> }
        </>
      )
    } else if (paidDebtCards && paid) {
      return (
        <>
          { paidDebtCards.youPaid.length ? paidDebtCards.youPaid.map((debtCard) => <DebtCardsByOwedFilter key={debtCard.id} debtCard={debtCard} isPaid={true} />) : <Text style={{color: 'white'}}>Nothing Yet!</Text> }
          { paidDebtCards.youReceived.length ? paidDebtCards.youReceived.map((debtCard) => <DebtCardsByOwedFilter key={debtCard.id} debtCard={debtCard} isPaid={true} />) : <Text style={{color: 'white'}}>Nothing Yet!</Text> }
        </>
      )
    } else {
      return <Text style={{color: 'white'}}>Something went wrong!</Text>
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Records\n'}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingLeft: '20%', paddingRight: '20%' }}>
        <Text onPress={() => {setOweFilter(true)}} style={[OweFilter && styles.filter, styles.filters]}>I OWE</Text>
        <Text onPress={() => {setOweFilter(false)}} style={[!OweFilter && styles.filter, styles.filters]}>OWES ME</Text>
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
        color='white'
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
    fontSize: 30,
    paddingVertical: 10
  },
  cardText: {
    textAlign: 'center',
    fontSize: 15,
  },
  container: {
    paddingTop: 50,
    paddingBottom: 50,
    flex: 1
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
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
    fontWeight: 'bold',
    color: 'white'

  },
  filter: {
    backgroundColor: 'red',
  },
  filters: {
    padding: '5%',
    color: 'white'
  },
  card: {
    backgroundColor: 'white',
    borderWidth: .2,
    width: 330,
    height: 200,
    margin: 10,
    borderRadius: 15,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'white',
    shadowOpacity: .3
  },
  cardButtons: {
    fontSize: 20,
    textAlign: 'center',
    padding: 8,
    margin: 5,
    marginTop: 10,
    fontWeight: '600',
    color: 'white'
  },
  paidbutt: {
    color: 'green',
  },
  reminderbutt: {
    color: 'purple',
  },
  deleteButt: {
    color: 'red'
  },
  buttonContainers: {
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  keyName: {
    color: 'grey',
  }
});
