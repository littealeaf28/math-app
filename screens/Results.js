import React from 'react';
import { Text, View ,Button} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { styles } from '../styles';
//import { NavigationContainer } from '@react-navigation/native';

export default function Results({route,navigation}) {
    //const test = navigation.getParam(corr);
    const {corr} = route.params;
  return (
    <View>
      <Text>Results {corr} </Text>
      <TouchableHighlight style={styles.button} title="Go to Menu Page"
      onPress={() => navigation.navigate('Home')}>
        <Text>Return Home</Text>
      </TouchableHighlight>
    </View>
  );
}
