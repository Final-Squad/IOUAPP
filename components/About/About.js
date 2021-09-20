import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Animated } from 'react-native';
// import Emoji from 'react-native-emoji';

const image = {}

const words = [
  '"New software engineers on the block."',
  '"Forbs meets Playstation."',
  '"No sleep and no coffee."',
  '"We built this city."',
  '"What day is it again?"',
  '"Who needs sleep when you could code?"',
  '"You`re gonna love me."',
  '"You should come to DAE."',
  '"Made with a lot of love."',
  '"Quarentine Mission."',
  '"Drifting further and further away from the start."',
  '"Marcelo likes Java."',
  '"Sorry no blockchain... yet."',
  '"I know you`ll miss us but we have to go."',
  '"Did we make you happy Betty?"',
  '"There`s no gong but we still got the job."',
  '"We might continue to work on this."',
  '"Not bad for our first app."',
  '"Its really the end."',
  '"What will I do after this?"',
  '"We`ll miss you Betty."',
  '"Its been fun."',
  '"Chris likes JavaScript, but hates Java."',
  '"Just a few steps from freedom!"',
  '"I wont forget you."',
  '"I`m hungry."',
  '"Hi hungry, I`m Dad."',
  '"We learned so much."',
  '"We like pain."',
  '"They don`t make them like this... till now."',
  '"Currently hacking... into your heart."',
  '"Feel free to send your love to us."',
  '"We knew nothing..."',
  '"now we make apps."',
  '"I dont know how long I`ll be around..."',
  '"but I`d like to enjoy it."',
  '"Teach your children how to code."',
  '"Thank for your hard work and motivation Ashley"',
  '"Thank God for Kay"',
  '"Thank you for your wisdom Al"',
  '"Thank you for being a friend Mo"',
  '"Thank you for your positivity Kaitlyn"',
  '"Thank you for everything Holberton/DAE"',
  '"This is just the start!"'
]


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



export default function About({setApp}) {
  const [string, setString] = useState('Hello')
  const [num, setNum] = useState(0)
  const [run, setRun] = useState(true)


  useEffect(() => {
    let isSubscribed = true
    run && newString();
    return () => isSubscribed = false
  }, [])

  const newString = () => {
    console.log(string)
    sleep(3000).finally(() => {
      setNum((num % words.length) + 1)
      setString(words[num % words.length])
    })
  }

  return (
    <View style={styles.container}>
      {/* <ImageBackground source={image} resizeMode="cover"> */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            IOU<Text style={styles.apps}>APP</Text>
          </Text>
        </View>

        <View>
            <Text style={styles.title}>{string}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>
            Two years ago we started our journey at holberton school. It was long and tiresome, hard at times but very fun. We definitly grew so much for being here.
            Thanks to everyone that was part of the experience. This is just the start!
          </Text>
        </View>

        <View style={styles.buttons}>
          <Button
            title="Go Back" 
            color="black"
            onPress={() => {
              setRun(false)
              setApp('Front')
            }}
          />
        </View>

        <View>
          <Text style={{textAlign: 'center'}}><Text>Love</Text> for <Text style={{color: 'red'}}>Holberton</Text><Text> / </Text><Text>D</Text><Text style={{color: 'red'}}>A</Text>+<Text style={{color: 'purple'}}>E</Text></Text>
        </View>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '10%',
    backgroundColor: 'pink'
    
  },
  titleContainer: {
    marginBottom: 50,
  },
  title: {
    fontSize: 50,
    textAlign: 'center'
  },
  apps: {
    color: 'red',
    fontSize: 50,
    opacity: .3
  },
  content: {
    padding: '10%'
  },
  text: {
    textAlign: 'auto'
  }
});