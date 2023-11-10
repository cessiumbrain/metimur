import { ScrollView, Text, View, Pressable} from "react-native-web";
import { styles } from "../styles";
import { LineChart, Bar } from "@mui/x-charts";
import { Line } from "react-chartjs-2"; 

function ChartElement(props) {
  console.log(props);

  return (
    <>
      <LineChart
        xAxis={[{ scaleType: "point", data: props.datesArr }]}
        series={[
          {
            data: props.answersArr,
          },
        ]}
        width={500}
        height={300}
      />
    </>
  );
}

function TrackAnswers({ route: { params }, navigation }) {
  console.log(params);
  //create an array of just answers objects
  let answerObjsArr = [];
  let isoDatesArr = [];
  for (let i = 0; i < params.answerHistory.length; i++) {
    answerObjsArr.push(params.answerHistory[i].answers);
    isoDatesArr.push(params.answerHistory[i].time_created);
  }
  const datesArr = isoDatesArr.map((isoDateStr) => {
    const dateObj = new Date(isoDateStr);
    const date = dateObj.getDate();
    const month = dateObj.getMonth();

    return `${date} ${month}`;
  });

  //create an array of questions text
  const questionsTextArr = params.questions.map((question) => {
    return question.question_text;
  });

  //create an array of questionAnswerTypes
  const answerTypesArr = params.questions.map((question) => {
    return question.answer_type;
  });

  return (
    <View>
      <ScrollView contentContainerStyle={styles.containerView}>
        {/* map over each question */}
        {questionsTextArr.map((questionText, idx) => {
          //create an array of answer data for the specific question
          let answersArr = answerObjsArr.map((answerObj) => {
            return answerObj[idx];
          });
          console.log(answersArr);
          return (
            <View key={idx}>
              <Text>{questionText}</Text>
              <ChartElement
                datesArr={datesArr}
                questionTextArr={questionText}
                answerType={answerTypesArr[idx]}
                answersArr={answersArr}
              ></ChartElement>
            </View>
          );
        })}
        <Pressable 
        style={styles.button}
        onPress={()=>{
            navigation.navigate('profile')
      }}>
        <Text>Profile</Text>
      </Pressable>
      </ScrollView>
      
    </View>
  );
}

export default TrackAnswers;
