
import React, { useState, useEffect } from 'react';
import { Text, TextInput, View ,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {styles} from '../styles.js'
import * as Progress from 'react-native-progress';

export default function Problem({route,navigation}) {
  const {problems} = route.params;
  const {total} = route.params;
  const [count, setCount] =useState(null);
  const op = manageOperator();
  const data = questionData(total);
  const [finished,setFinished] = useState(false);
  console.log("BEFORE: "+ count);
  if(count == null){
    c1 = problems.map(x=> x.number);
    setCount(c1);
    //also set count for op and data
    op.updateCount(c1);
    data.updateCount(c1);
  }
  console.log("Count AFTER: " + count);
  
  
  
  const question = manageQuestions();
  

  //for the form (updating the answer box)
  const [answer, onChangeAnswer] = useState("");

  function createResults(){
    var resultArray=[];
    for(i=0;i <4;i++){
      resultArray.push(
        {
          type: problems[i].type,
          numTotal : count[i],
          numCorr: data.arrayCorrect[i].toString(),
          key: i
        }
      );
    }
    //make updateResultsData asyncronous?
    
      data.updateResultsData(resultArray);
    console.log("INSIDE CREATERESULTS: " + resultArray);
    //data.updateResultsData(resultArray);
    return resultArray;
  }
  
  /*if((data.remainingQuestions == 0)){
    let res = createResults();
    console.log(res);
    navigation.navigate('Results',{total : total, totalCorrect : data.numCorrect,res: res});
  }*/
  //if(data.remainingQuestions == )
  function onSubmit(){
    console.log("Submitted with operator = " + op.operator);
    //if function is correct, increment correct
    var newCorrect = data.numCorrect;
    console.log("Created new Correct = " + newCorrect);
    if(answer == question.answer){
     
        newCorrect =  data.handleCorrect(op.counter);
  
     }
    
    //if questionCount > 0, then decrement and generate a new question
    data.handleDecrement();
    onChangeAnswer("");
    if(data.remainingQuestions > 1){
      newOp = op.updateOperator();
      console.log("New operator: " + newOp);
      question.newQuestion(newOp);
      onChangeAnswer("");
    }
    else{
      //otherwise, navigate to results page. 
      //call function to create JS array for Results Flatlist?
      //let res = createResults();
      /*let promise = new Promise(function(resolve,reject){
          var results1 = createResults();
          setTimeout(() => resolve(results1), 3000);
         // resolve(results1);
      });
      promise.then(result=>navigation.navigate('Results',{total : total, totalCorrect : newCorrect,res: result}),
              error=>alert(error));*/
      //make createResults more of a promise thing? and then navigate can subscribe?
      setFinished(true);
      //navigation.navigate('Results',{total : total, totalCorrect : newCorrect,res: res});
    }
    
  }


  function onFinish(){
    let res = createResults();
    console.log("COMPUTED RESULTS SHOULD BE DIS: " + res);
    navigation.navigate('Results',{total : total, totalCorrect : data.numCorrect,res: res});
    
  }
  return (
    <View>
        <Progress.Bar  progress={1-data.remainingQuestions/(total*1.0)} width={200} />
        <Text >Number of Questions Left: {data.remainingQuestions}</Text>
        <Text >Number correct: {data.numCorrect} </Text>

        <Text style = {styles.text} >{question.first} {op.operator} {question.second} = {answer} </Text>
        
        

        

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Type your answer here!"
          onChangeText={text=> onChangeAnswer(text)}
          value={answer}
          maxLength={3}
          keyboardType={"numeric"}
          onSubmitEditing={()=> onSubmit()}
        />
        
        {finished == false ? (<Text>Not finished</Text>) :
        (<TouchableHighlight style = {styles.button} title="finish" onPress={() => onFinish()}>
        <Text>Finish!</Text>
      </TouchableHighlight>)}
        
        <TouchableHighlight style = {styles.button} title="Go to Home Page" onPress={() => navigation.navigate('Home')}>
          <Text>Go to Home Page</Text>
        </TouchableHighlight>
    </View>
  );
}


function manageOperator(){
  const operators = ["+","-","x","/"];
  const [count,setCount] = useState(null);
  const [counter,incrementCounter] = useState(0);
  const [operator,setOperator] = useState(operators[0]);
  console.log("Count in manageOperator" + count);

  function updateCount(c){
      setCount(c);
  }
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
    updateCount,
    counter,
    operator,
    updateOperator
    
};
}

function manageQuestions(){
  function generateRandom(){
     return Math.floor(Math.random()*10);
  }
  //this may be inconsistent if there is no addition. Fix later lol
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



function questionData(initialNum){
  const [remainingQuestions, setValue] = useState(initialNum);
  const[numCorrect, setCorrect]=useState(0);
  const[arrayCorrect,setIndividualCorrect] = useState([0,0,0,0]);
  const[count,setCount] = useState(null);
  //final array to pass....but like the question is, will I need to do this? Do I even need a copy of it here?
  const[resultsData,updateResults]=useState(null);
  function updateResultsData(res){
       updateResults(res);
  }
  function updateCount(c){
    setCount(c);
  }
  function handleCorrect(counter){
    setCorrect(numCorrect => numCorrect + 1);
    console.log("UPDATED numCORRECT: " + numCorrect);
    var newArrCorrect = [...arrayCorrect];
    newArrCorrect[counter]++;
    setIndividualCorrect(newArrCorrect);
    console.log(newArrCorrect);
    return numCorrect +1;
  }
  function handleDecrement() {
    if(remainingQuestions >0){
      setValue(remainingQuestions - 1);
    }
   
  }

  return {
    count,
    arrayCorrect,
    remainingQuestions,
    handleDecrement,
    numCorrect,
    handleCorrect,
    updateCount,
    resultsData,
    updateResultsData
  }
}

