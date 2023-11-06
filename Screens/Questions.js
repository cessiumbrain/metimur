import { View, Text, Pressable } from "react-native";
import { styles } from "../styles";
import { useContext, useEffect, useState } from "react";
import answerTypes from "../AnswerTypes";
import { QuestionIdxContext } from "../contexts";

function Questions({navigation, route : {params}}) {
    console.log(params)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const [error, setError] = useState()

  const questionIdx = useContext(QuestionIdxContext)

  const currentQuestion = params.questions[questionIdx]
  return (
    
    
    <View style={styles.containerView}>
      <View>
        <Text>{params.questions[questionIdx].question_text}</Text>
      </View>
      <View style={styles.answerView}>
        {
            answerTypes[currentQuestion.answer_type].map((answer, idx)=>{
                return(
                    <Pressable 
                    key={idx}
                    style={answer==selectedAnswer ? styles.selectedAnswerButton : styles.answerButton}
                    onPress={()=>{
                        setSelectedAnswer(answer)
                    }}
                    >
                       <Text>{answer}</Text>  
                    </Pressable>
                   
                )
                
            })
        }
      </View>
      <Pressable 
        onPress={()=>{
            if(selectedAnswer){
                if(questionIdx==params.questions.length-1){
                    let newAnswerArray = params.currentAnswers

                    newAnswerArray[questionIdx] = selectedAnswer
                    console.log(newAnswerArray)
                    params.setCurrentAnswers(newAnswerArray)
                    navigation.navigate('review')
                } else {
                    let newAnswerArray = params.currentAnswers

                    newAnswerArray[questionIdx] = selectedAnswer
                    console.log(newAnswerArray)
                    params.setCurrentAnswers(newAnswerArray)
                    
                    params.setQuestionIdx(questionIdx+1)
                }
            
            
                
            }
            
        }}
        style={styles.button}>
        <Text>Next</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}

export default Questions;
