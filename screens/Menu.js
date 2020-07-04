import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TextInput, Keyboard } from 'react-native';
import {colors, styles} from '../styles';
import { Button } from 'react-native-elements';

export default function Menu({ navigation }) {
  const MAX_PROBLEMS = 500;

  const [problems, setProblems] = useState([
    { type: 'Add', number: '0', key: '1' },
    { type: 'Subtract', number: '0', key: '2' },
    { type: 'Multiply', number: '0', key: '3' },
    { type: 'Divide', number: '0', key: '4' }
  ]);
  const [total, setTotal] = useState(0);
  const [keyboardIsHidden, setKeyboardHidden] = useState(true);
  const [instructions, setInstructions] = useState({
    msg: 'Please select the number of problems you would like to do',
    color: colors.primaryDark,
    error: true
  })

  useEffect(() => {
    const showKeyboard = () => { setKeyboardHidden(false); }
    const hideKeyboard = () => { setKeyboardHidden(true); }

    Keyboard.addListener('keyboardDidShow', showKeyboard);
    Keyboard.addListener('keyboardDidHide', hideKeyboard);

    return(() => {
      Keyboard.removeListener('keyboardDidShow', showKeyboard);
      Keyboard.removeListener('keyboardDidHide', hideKeyboard);
    });
  }, []);

  useEffect(() => {
    if (total > MAX_PROBLEMS) {
      setInstructions({
        msg: `Please select less than ${MAX_PROBLEMS} problems`,
        color: colors.error,
        error: true
      });
    } else if (total === 0) {
      setInstructions({
        msg: 'Please select the number of problems you would like to do',
        color: colors.primaryDark,
        error: true
      })
    } else {
      setInstructions({
        msg: 'Please select the number of problems you would like to do',
        color: colors.primaryDark
      });
    }
  }, [total]);

  const updateProblems = (text, index) => {
    if (text === '') {
      text = '0';
    }
    problems[index].number = text;
    setProblems(problems);
  }

  const updateTotal = () => {
    let tempTotal = 0;
    problems.forEach((problem) => {
      tempTotal += parseInt(problem.number);
    });
    setTotal(tempTotal);
  }

  const completeMenuSelect = () => {
    // Only allows moving on to problems screen if keyboard is hidden so all problem numbers are properly processed
    if (!instructions.error && keyboardIsHidden && total > 0) {
      navigation.navigate('Problem', { problems, total });
    }
  }

  return (
    <View style={styles.background}>
      <Text style={{ ...styles.instructions, color: instructions.color }}>{instructions.msg}</Text>
      <FlatList
        style={{ maxHeight: '72%', padding: 6 }}
        data={problems}
        renderItem={({item, index}) => (
          <View style={{ borderStyle: 'solid', borderBottomWidth: 1, borderColor: colors.primary, padding: 2, margin: 2 }}>
            <Text style={{ fontSize: 24, color: colors.primaryDark }}>{item.type}</Text>
            <TextInput
              style={{ fontSize: 24, color: colors.primaryDark }}
              keyboardType='numeric'
              onChangeText={(text) => updateProblems(text, index)}
              onEndEditing={updateTotal}
              placeholder={problems[index].number}
            />
          </View>
      )}/>
      <Button
          containerStyle={{ alignSelf: 'center' }}
          onPress={completeMenuSelect}
          title="Solve problems!"
      />
    </View>
  );
}
