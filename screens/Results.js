import React from 'react';
import { Text, View ,Button} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
//import { NavigationContainer } from '@react-navigation/native';

export default function Results({route,navigation}) {
    //const test = navigation.getParam(corr);
    const {corr} = route.params;
  return (
    <View>
      <Text>Results {corr} </Text>
      <TouchableHighlight title="Go to Menu Page"
      onPress={() => navigation.navigate('Home')}>
        <Text>Return Home</Text>
      </TouchableHighlight>
    </View>
  );
}
