import { View, Pressable, Text } from "react-native-web";
import { styles } from "../styles";
import { useEffect } from "react";
import { supabase } from "../App";

function Profile({route : {params: {setQuestions, setAnswerHistory}}, navigation}) {

  useEffect(() => {
    async function fetch() {
      let { data: Questions, error } = await supabase
        .from("Questions")
        .select("*");

      setQuestions(Questions);

      console.log("questions", Questions, error);

      //fetch previous answers

      let { data: Answers, error: answersError } = await supabase
        .from("Answers")
        .select("*")
        .eq("user_id", "c6851b95-a8e6-4e87-a1ae-d5db4239307b");

      console.log("answers", Answers, answersError);
    };
    fetch()
  }, []);
  return (
    <View style={styles.containerView}>
      <Text>Profile</Text>
      <Pressable
        onPress={() => navigation.navigate("questions")}
        style={styles.button}
      >
        <Text>Complete Inventory</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          props.navigation.navigate("track-answers");
        }}
        style={styles.button}
      >
        <Text>Track Answers</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text>Settings</Text>
      </Pressable>
    </View>
  );
}

export default Profile;
