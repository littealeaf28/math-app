import React, { useState, useRef } from 'react';
import { Text, View, FlatList, TextInput } from 'react-native';
import { styles } from '../styles';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function Menu({ navigation }) {
  const [problems, setProblems] = useState([
    { type: 'Add', number: '0', key: '1' },
    { type: 'Subtract', number: '0', key: '2' },
    { type: 'Multiply', number: '0', key: '3' },
    { type: 'Divide', number: '0', key: '4' }
  ]);
  const total = useRef(0);

  const updateProblems = (text, index) => {
    if (text === '') {
      text = '0';
    }
    total.current -= parseInt(problems[index].number);
    total.current += parseInt(text);
    problems[index].number = text;
    setProblems(problems);
  }

  /* const resetProblems = () => {
    problems.forEach((problem) => {
      problem.number = '0';
    });
  }

  resetProblems(); */

  return (
    <View>
      <Text>Errors</Text>
      <FlatList
        data={problems}
        renderItem={({item, index}) => (
          <View>
            <Text>{item.type}</Text>
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