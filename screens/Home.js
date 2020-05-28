import React from 'react';
import { Text, View, Image } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import Splash from '../assets/splash.png';

export default function Home({ navigation }) {
  return (
    <View style={{
      flex: 1, alignItems: 'center'
    }}>
      <Text style={{
        fontSize: 32, margin: 8
      }}>Welcome to Edo Wado!</Text>
      { /* <TouchableHighlight style = {styles.button} title="Go to Menu Page"
      onPress={() => navigation.navigate('Menu')}>
        <Text>Go to menu page</Text>
  </TouchableHighlight> */ }
      <Image source={Splash} style={{
        width: 200,
        height: 300,
        // resizeMethod: 'resize'
      }}/>
      <Button onPress={() => navigation.navigate('Menu')} title="Go to menu"/>
    </View>
  );
}