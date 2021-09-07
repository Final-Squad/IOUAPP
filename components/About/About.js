import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, Button, Animated } from 'react-native';
import { ImageBackground } from 'react-native';
import FadeInOut from 'react-native-fade-in-out';

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
  '"Marcelo likes java."',
  '"Sorry no blockchain... yet."',
  '"I know you`ll miss us but we have to go."',
  '"Did we make you happy, Mr. Bitcoin."',
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
  '"We knew nothing."',
  '"Now we can make apps"'
]


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



export default function About({setApp}) {
  const [string, setString] = useState('Hello')
  const [num, setNum] = useState(0)
  const fadeAnim = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 10000,
      }
    ).start();
  }, [string])


  React.useEffect(() => {
    async() => {
      console.log('newString')
      sleep(5000)

      setNum((num % words.length) + 1)
      console.log("string is", string)

      setString(words[num % words.length])
    }
  }, [string])

  // const newString = async() => {

  //   console.log('newString')
  //   await sleep(5000)

  //   setNum((num % words.length) + 1)
  //   console.log("string is", string)

  //   setString(words[num % words.length])
  // }



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

        <View style={styles.buttons}>
          <Button
            title="Go Back" 
            color="black"
            onPress={() => {
              setApp('Front')
            }}
          />
        </View>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '10%'
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
  }
});