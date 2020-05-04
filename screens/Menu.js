import React from 'react';
import { Text, View ,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
export default function Menu({navigation}) {
  return (
    <View>
      <Text>Menu!</Text>
      <TouchableHighlight title="Go to Problem Page" onPress={() => navigation.navigate('Problem')}>
        <Text>Go to Problem Page</Text>
      </TouchableHighlight>

    </View>
  );
}