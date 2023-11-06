import {Pressable, Text, View} from 'react-native'
import { styles } from '../styles'

function Review({route: {params}}){
    console.log(params)
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
            <Pressable style={styles.button}>
                <Text>Submit</Text>
            </Pressable>
        </View>
       
    )
}

export default Review