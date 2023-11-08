import {Pressable, Text, View} from 'react-native'
import { styles } from '../styles'
import {supabase} from '../App.js'
import { UserContext } from '../contexts.js'
import { useContext } from 'react'


function Review({navigation, route: {params}}){
    const user = useContext(UserContext)
    console.log(params, user)
    return(
        <View style={styles.reviewView}>
            {params.questions.map((question, idx)=>{
                return(
                    <View key={idx}>
                    <Text style={styles.reviewText}>{question.question_text}</Text>
                    <Text style={styles.reviewText}>{params.currentAnswers[idx]}</Text>
                    </View>
                )
            })}
            <Pressable 
            onPress={async ()=>{
                //create JSON object
                let answersObj={}
                for(let i=0; i<params.currentAnswers.length; i++){
                    answersObj[i] = params.currentAnswers[i]
                }
                
                const { data, error } = await supabase
                .from('Answers')
                .insert([
                { answers: answersObj, user_id: 'c6851b95-a8e6-4e87-a1ae-d5db4239307b' },
                ])
                .select()
                console.log(data,error)
                navigation.navigate('profile')
                            }}
            style={styles.button}>
                <Text>Submit</Text>
            </Pressable>
            <Pressable 
            style={styles.button}
            onPress={()=>{
                navigation.navigate('questions')
            }}>
                <Text>Back</Text>
            </Pressable>
        </View>
       
    )
}

export default Review