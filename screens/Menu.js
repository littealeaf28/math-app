import React, { useState } from 'react';
import { Text, View, FlatList, TextInput } from 'react-native';
import { styles } from '../styles';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function Menu({ navigation }) {
  const [problems, setProblems] = useState([
    { name: 'Add', number: '0', key: '1' },
    { name: 'Subtract', number: '0', key: '2' },
    { name: 'Multiply', number: '0', key: '3' },
    { name: 'Divide', number: '0', key: '4' }
  ]);
  
  const updateProblems = (text, index) => {
    if (text === '') {
      text = '0';
    }
    problems[index].number = text;
    setProblems(problems);
  }

  return (
    <View>
      <Text>Errors</Text>
      <FlatList
        data={problems}
        renderItem={({item, index}) => (
          <View>
            <Text>{item.name}</Text>
            <TextInput keyboardType='numeric' 
            onChangeText={(text) => updateProblems(text, index)}
            placeholder={problems[index].number}/>
          </View>
        )}/>
        <TouchableHighlight style={styles.button} title="Go to Menu Page" 
        onPress={() => navigation.navigate('Problem', problems)}>
          <Text>Go to Problems</Text>
        </TouchableHighlight>
    </View>
  );
}