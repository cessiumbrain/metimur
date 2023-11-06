import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY } from "./secrets";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Signup from "./Screens/SignUp";
import Profile from "./Screens/Profile";
import TrackAnswers from "./Screens/TrackAnswers";
import Questions from "./Screens/Questions";
import Review from "./Screens/Review";
import { QuestionIdxContext } from "./contexts";

const Stack = createNativeStackNavigator();
export const supabase = createClient(
  "https://epxikhdeulznrxllkhlo.supabase.co",
  SUPABASE_KEY
);

export default function App() {
  const [questionIdx, setQuestionIdx] = useState(0)
  const [questions, setQuestions] = useState([
    {
      question_id: 1,
      inventory_id: "3479ff66-69ff-45c8-a4ca-82ad60ce0fca",
      answer_type: "yes/no",
      inventory_question_number: 1,
      question_text:
        "Throughout our lives, most of us have had pain fr…in other than these everyday kinds of pain today?",
    },
    {
      question_id: 2,
      inventory_id: "3479ff66-69ff-45c8-a4ca-82ad60ce0fca",
      answer_type: "1-10",
      inventory_question_number: 2,
      question_text:  `Please rate your pain by marking the box beside the number that best describes your pain at its worst
      in the last 24 hours.`
    }
  ]);
  const [user, setUser] = useState({
    email: "s",
  });
  const [currentAnswers, setCurrentAnswers] = useState(['s'])

  useEffect(()=>{

  })
  async function login(email, password) {
    //submit auth

    let { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
    console.log(authData, authError);
    //set user state
    if (authData) {
      setUser(authData);
    }
    //fetch questions

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
  }

  const Stack = createNativeStackNavigator();
  if (user) {
    return (
     <QuestionIdxContext.Provider value={questionIdx}>

     
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="questions"
        >
          <Stack.Screen
            name="track-answers"
            component={TrackAnswers}
          ></Stack.Screen>
          <Stack.Screen 
          name="profile" 
          component={Profile}></Stack.Screen>
          <Stack.Screen 
          name="questions" 
          component={Questions}
          initialParams={
            {
           
              "setQuestionIdx": setQuestionIdx,
              "questions": questions,
              "setCurrentAnswers": setCurrentAnswers,
              "currentAnswers": currentAnswers
            }
          }

          ></Stack.Screen>
          <Stack.Screen
          name="review"
          component={Review}
          initialParams={{
            "questions": questions,
            "currentAnswers": currentAnswers
          }
            
          }
          >

          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      </QuestionIdxContext.Provider>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="login"
        >
          <Stack.Screen
            initialParams={{
              login: login,
            }}
            name="login"
            component={Login}
          ></Stack.Screen>
          <Stack.Screen
            name="signup"
            component={Signup}
            initialParams={{
              setUser: setUser,
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


