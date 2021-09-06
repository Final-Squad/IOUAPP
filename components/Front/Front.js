import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ImageBackground } from 'react-native';

const image = {}


export default function Front({setApp}) {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={image} resizeMode="cover"> */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            IOU<Text style={styles.apps}>APP</Text>
          </Text>
        </View>

        <View>
          <Button 
            title="Create New Record"
            color="grey"
            onPress={() => {
              setApp('Create')
            }}
          />
          <Button
            title="View Records" 
            color="grey"
            onPress={() => {
              setApp('View')
            }}
          />
        </View>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 300,
  },
  title: {
    fontSize: 50,
  },
  apps: {
    color: 'red',
    fontSize: 50,
    opacity: .3
  },
  
});