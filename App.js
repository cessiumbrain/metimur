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
import { QuestionIdxContext, UserContext, QuestionsContext } from "./contexts";

const Stack = createNativeStackNavigator();
export const supabase = createClient(
  "https://epxikhdeulznrxllkhlo.supabase.co",
  SUPABASE_KEY
);

export default function App() {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [questions, setQuestions] = useState();
  const [user, setUser] = useState();
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [answerHistory, setAnswerHistory] = useState()

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  async function login(email, password) {
    //submit auth

    let { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
    console.log("auth", authData, authError);
    //set user state
    if (authData) {
      setUser(authData);
    }
  }

  const Stack = createNativeStackNavigator();
  if (user) {
    return (
      <QuestionIdxContext.Provider value={questionIdx}>
        <UserContext.Provider value={user}>
          <QuestionsContext.Provider value={questions}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="profile"
              >
                <Stack.Screen
                  name="track-answers"
                  component={TrackAnswers}
                ></Stack.Screen>
                <Stack.Screen
                  name="profile"
                  component={Profile}
                  initialParams={{
                    "setQuestions": setQuestions,
                    "setAnswerHistory": setAnswerHistory,
                  }}
                ></Stack.Screen>
                <Stack.Screen
                  name="questions"
                  component={Questions}
                  initialParams={{
                    "setQuestionIdx": setQuestionIdx,
                    "questions": questions,
                    "setCurrentAnswers": setCurrentAnswers,
                    "currentAnswers": currentAnswers,
                  }}
                ></Stack.Screen>
                <Stack.Screen
                  name="review"
                  component={Review}
                  initialParams={{
                    questions: questions,
                    currentAnswers: currentAnswers,
                  }}
                ></Stack.Screen>
              </Stack.Navigator>
            </NavigationContainer>
          </QuestionsContext.Provider>
        </UserContext.Provider>
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
