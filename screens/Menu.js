import React, { useState } from 'react';
import { Text, View, FlatList, TextInput } from 'react-native';
import { styles } from '../styles';

export default function Menu() {
  const [problems, setProblems] = useState([
    { name: 'Add', number: '0', key: '1' },
    { name: 'Subtract', number: '0', key: '2' },
    { name: 'Multiply', number: '0', key: '3' },
    { name: 'Divide', number: '0', key: '4' }
  ]);

  const updateProblems = (text, index) => {
    problems[index].number = text;
    setProblems(problems);
    console.log(problems);
  }

  return (
    <View>
      <FlatList
        data={problems}
        renderItem={({item, index}) => (
          <View>
            <Text>{item.name}</Text>
            <TextInput keyboardType='numeric' 
            onChangeText={(text) => updateProblems(text, index)}
            placeholder={problems[index].number}
            />
          </View>
        )}
      />
    </View>
    /* <View style={styles.main}>
      <Text>Menu!</Text>
      <View style={styles.menuButton}>
        <Text>Add!</Text>
      </View>
      <View style={styles.menuButton}>
        <Text>Subtract!</Text>
      </View>
      <View style={styles.menuButton}>
        <Text>Multiply!</Text>
      </View>
      <View style={styles.menuButton}>
        <Text>Divide!</Text>
      </View>
    </View> */
  );
}