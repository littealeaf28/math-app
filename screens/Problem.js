
import React, { useState, useEffect } from 'react';
import { Text, TextInput, View ,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ProgressBar from 'react-native-progress/Bar';
import * as Progress from 'react-native-progress';
export default function Problem({navigation}) {
  const counter = questionCount(20);
  const correct = correctCount();
  const question = manageQuestions();
  const [answer, onChangeAnswer] = useState("");
  function onDecrement(){
    counter.handleDecrement();
    correct.handleCorrect();
  }
  function onSubmit(){
    
    //if function is correct, increment correct, we will assume correctness for now
    if(answer == question.answer){
      correct.handleCorrect();
    }
    
    //if questionCount > 0, then decrement and generate a new question
    if(counter.remainingQuestions > 1){
      counter.handleDecrement();
      question.newQuestion();
      onChangeAnswer("");
    }
    else{
      navigation.navigate('Results');
    }
  }
  return (
    <View>
        <Progress.Bar progress={1-counter.remainingQuestions/20.0} width={200} />
        <Text>Number of Questions Left: {counter.remainingQuestions}</Text>
        <Text>Number correct: {correct.numCorrect} </Text>
        <Text>{question.first} + {question.second} = {question.answer} </Text>
        
        

        

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Type your answer here!"
          onChangeText={text=> onChangeAnswer(text)}
          value={answer}
          maxLength={3}
          keyboardType={"numeric"}
          onSubmitEditing={()=> onSubmit()}
        />
        <Text>Your answer: {answer}</Text>
        <TouchableHighlight title="Go to Home Page" onPress={() => navigation.navigate('Home')}>
          <Text>Go to Home Page</Text>
        </TouchableHighlight>
    </View>
  );
}


function manageQuestions(){
  function generateRandom(){
     return Math.floor(Math.random()*10);
  }
  const[first, setFirst] = useState(generateRandom());
  const[second,setSecond] = useState(generateRandom());
  const[answer, setAnswer] = useState(first + second);

  function newQuestion(){
    let a = generateRandom();
    let b = generateRandom();
    setFirst(a);
    setSecond(b);
    setAnswer(a + b);
  }
  return {
      first,
      second,
      answer,
      newQuestion
  };
}


function correctCount(){
  const[numCorrect, setValue]=useState(0);
  function handleCorrect(){
    setValue(numCorrect + 1);
    
  }
  return {
    numCorrect,
    handleCorrect
  };
}

function questionCount(initialNum){
  const [remainingQuestions, setValue] = useState(initialNum);
  function handleDecrement() {
    if(remainingQuestions >0){
      setValue(remainingQuestions -1);
    }
   
  }

  return {
    remainingQuestions,
    handleDecrement
  }
}

