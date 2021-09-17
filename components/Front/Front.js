import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ImageBackground } from 'react-native';

const image = {}

export default function Front({setApp, setloggedUser}) {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={image} resizeMode="cover"> */}
        <View style={styles.logoContainer}>
          <Text style={styles.iou}>
            IOU<Text style={styles.app}>APP</Text>
          </Text>
        </View>

        <View style={styles.buttons}>
          <Button
            title="Create New Record"
            color="black"
            onPress={() => {
              setApp('Create')
            }}
          />
          <Button
            title="View Records"
            color="black"
            onPress={() => {
              setApp('View')
            }}
          />
          <Button
            color='black'
            title="About Page"
            onPress={
              () => {
                setApp('About')
              }
            }
          />

          <Button
            color='black'
            title="Log Out"
            onPress={
              () => {
                setloggedUser(null)
                setApp('Login')
              }
            }
          />
        </View>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    height: 180,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    height: 350,
    width: 300,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iou: {
    fontSize: 50,
  },
  app: {
    color: 'red',
    fontSize: 50,
    opacity: .3,
  }
});
