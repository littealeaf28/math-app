import React from 'react';
import { Text, View ,Button} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
//import { NavigationContainer } from '@react-navigation/native';
import {styles} from '../styles.js'

export default function Home({navigation}) {
  return (
    <View>
      <Text>Home!How ya doing?</Text>
      <TouchableHighlight style = {styles.button} title="Go to Menu Page"
      onPress={() => navigation.navigate('Menu')}>
        <Text>Go to menu page</Text>
      </TouchableHighlight>
    </View>
  );
}
//const styles = StyleSheet.create({})