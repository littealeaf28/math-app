import React from 'react';
import { Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';

export default function Home({ navigation }) {
  return (
    <View>
      <Text>EDO WADO MATH</Text>
      { /* <TouchableHighlight style = {styles.button} title="Go to Menu Page"
      onPress={() => navigation.navigate('Menu')}>
        <Text>Go to menu page</Text>
  </TouchableHighlight> */ }

      <Button onPress={() => navigation.navigate('Menu')} title="Go to menu"/>
    </View>
  );
}