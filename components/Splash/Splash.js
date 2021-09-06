import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function Splash() {
  return (
    <View>
      <Text style={styles.title}>
        IOU<Text style={styles.apps}>APP</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
  },
  apps: {
    fontSize: 50,
    opacity: .3
  }
});