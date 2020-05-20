import React from 'react';
import { Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { styles } from '../styles.js';
import { Button } from 'react-native-elements';

export default function Home({ navigation }) {
  return (
    <View>
      <Text>Home! How ya doing?</Text>
      { /* <TouchableHighlight style = {styles.button} title="Go to Menu Page"
      onPress={() => navigation.navigate('Menu')}>
        <Text>Go to menu page</Text>
  </TouchableHighlight> */ }

      <Button type='outline' raised onPress={() => navigation.navigate('Menu')} title="Go to menu"/>
    </View>
  );
}