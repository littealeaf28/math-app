
import React, { useState, useEffect } from 'react';
import { Text, TextInput, View ,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {styles} from '../styles.js'
import * as Progress from 'react-native-progress';

export default function Problem({route,navigation}) {
  const {problems} = route.params;
  const {total} = route.params;
  //console.log(total);
  //get the number of each type of question
  var count =[];
  for(var i=0;i<problems.length;i++){
    count = [...count,problems[i].number];
  }
  //console.log("Count: " + count);

  const op = manageOperator(count);
  //console.log(op.operator);
  //console.log(op.count);
  
  const question = manageQuestions();
  const data = questionData(total);

  //for the form (updating the answer box)
  const [answer, onChangeAnswer] = useState("");
  
  
  function onSubmit(){
    console.log("Submitted with operator = " + op.operator);
    //if function is correct, increment correct
    var newCorrect;
    if(answer == question.answer){
      newCorrect = data.handleCorrect();
     }
    
    //if questionCount > 0, then decrement and generate a new question
    if(data.remainingQuestions > 1){
      
      data.handleDecrement();
      newOp = op.updateOperator();
      console.log("New operator: " + newOp);
      question.newQuestion(newOp);
      onChangeAnswer("");
    }
    else{
      //otherwise, navigate to results page. Here we need to send problems, as well as the number of questions
      //correct for each(in separate array? )
     
      navigation.navigate('Results',{corr : newCorrect});
    }
  }
  return (
    <View>
        <Progress.Bar progress={1-data.remainingQuestions/(total*1.0)} width={200} />
        <Text>Number of Questions Left: {data.remainingQuestions}</Text>
        <Text>Number correct: {data.numCorrect} </Text>
        <Text>Total: {total}</Text>
        <Text> TEst: {problems[0].type}</Text>
  <Text>{question.first} {op.operator} {question.second} = {question.answer} </Text>
        
        

        

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
        <TouchableHighlight style = {styles.button} title="Go to Home Page" onPress={() => navigation.navigate('Home')}>
          <Text>Go to Home Page</Text>
        </TouchableHighlight>
    </View>
  );
}

function manageOperator(c){
  const operators = ["+","-","x","/"];
  const [count,setCount] = useState(c);
  const [counter,incrementCounter] = useState(0);
  const [operator,setOperator] = useState(operators[0]);
  
  function updateOperator(){
    console.log("RUNNING UPDATEOPERATOR with counter = " + counter + "and count[counter] = " + count[counter]);
    var newCounter = counter;
      var newCount = [...count];
      newCount[counter]--;
      setCount(newCount);
      console.log("Now count[counter] is " + count[counter] + " vs. "+ newCount[counter]);
    if(newCount[counter] == 0){
       newCounter = counter +1;
      incrementCounter(newCounter);
      setOperator(operators[newCounter]);
      console.log("Set operator to "+ operators[newCounter]);
    }
    
      
    
    return operators[newCounter];
  }
  return {
    count,
    operator,
    updateOperator
    
};
}

function manageQuestions(){
  function generateRandom(){
     return Math.floor(Math.random()*10);
  }
  const[first, setFirst] = useState(generateRandom());
  const[second,setSecond] = useState(generateRandom());
  const[answer, setAnswer] = useState(first + second);
  

  function newQuestion(op){
    console.log("Operator is: " + op + " and generating new question");
    let a = generateRandom();
    let b = generateRandom();
    if(op == "+"){
        newAddition(a,b);
    }
    else if(op == "-"){
      newSubtraction(a,b);
    }
    else if(op == "x"){
      newMultiplication(a,b);
    }
    else{
      newDivision(a,b);
    }
  }

  function newAddition(a,b){
    console.log("new addition");
    setFirst(a);
    setSecond(b);
    setAnswer(a + b);
  }
  function newSubtraction(a,b){
    console.log("new sub");
    if(a < b){
      a = a +b;
      b = a-b;
      a = a-b;
    }
    setFirst(a);
    setSecond(b);
    setAnswer(a - b);
  }
  function newMultiplication(a,b){
    console.log("new mult");
    setFirst(a);
    setSecond(b);
    setAnswer(a * b);
  }
  function newDivision(a,b){
    //he doesn't do this rn.. maybe will change to word problems?
    //if we do want to do division additional checks needed
    setFirst(a);
    setSecond(b);
    setAnswer(a * b);
  }
  return {
      first,
      second,
      answer,
      newQuestion
  };
}


/*function correctCount(){
  const[numCorrect, setValue]=useState(0);
  function handleCorrect(){
    setValue(numCorrect + 1);
    
  }
  return {
    numCorrect,
    handleCorrect
  };
}*/

function questionData(initialNum){
  const [remainingQuestions, setValue] = useState(initialNum);
  const[numCorrect, setCorrect]=useState(0);
  function handleCorrect(){
    setCorrect(numCorrect + 1);
    return numCorrect +1;
  }
  function handleDecrement() {
    if(remainingQuestions >0){
      setValue(remainingQuestions - 1);
    }
   
  }

  return {
    remainingQuestions,
    handleDecrement,
    numCorrect,
    handleCorrect
  }
}

