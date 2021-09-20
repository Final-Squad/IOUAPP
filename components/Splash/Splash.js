import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Splash({setApp}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true
    }).start();
  };


  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    fadeIn();
    sleep(4000).finally(() => {
        fadeOut()
        sleep(4000).finally(() => {
        setApp('Login');
        })
      })
    }
  )
  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
    >
      <Text style={styles.title}>
        IOU<Text style={styles.apps}>APP</Text>
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    color: 'white'
  },
  apps: {
    color: 'red',
    fontSize: 50,
    opacity: 1
  }
});