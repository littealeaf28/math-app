import React from 'react';
import { Text, View ,Button} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
//import { NavigationContainer } from '@react-navigation/native';

export default function Results({navigation}) {
  return (
    <View>
      <Text>Results</Text>
      <TouchableHighlight title="Go to Menu Page"
      onPress={() => navigation.navigate('Home')}>
        <Text>Return Home</Text>
      </TouchableHighlight>
    </View>
  );
}
//const styles = StyleSheet.create({})