import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_KEY } from "./secrets";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Signup from "./Screens/SignUp";
import Profile from "./Screens/Profile";
import TrackAnswers from "./Screens/TrackAnswers";
import Questions from "./Screens/Questions";

const Stack = createNativeStackNavigator();
export const supabase = createClient(
  "https://epxikhdeulznrxllkhlo.supabase.co",
  SUPABASE_KEY
);

export default function App() {
  const [questions, setQuestions] = useState();
  const [user, setUser] = useState({
    email: 'j'
  });



  async function login(email, password) {
    //submit auth

    let { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    console.log(authData, authError)
    //set user state
    if(authData){
      setUser(authData)
    }
    //fetch questions

    let { data: Questions, error } = await supabase
      .from("Questions")
      .select("*");

    setQuestions(Questions);

    console.log(Questions, error);

    //fetch previous answers

    let { data: Answers, error: answersError } = await supabase
      .from("Answers")
      .select("*")
      .eq("user_id", "c6851b95-a8e6-4e87-a1ae-d5db4239307b");

    console.log(Answers, answersError);
  }

  const Stack = createNativeStackNavigator();
  if(user){
    return(
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="profile"
      >
        <Stack.Screen name="track-answers" component={TrackAnswers}></Stack.Screen>
        <Stack.Screen name="profile"
         component={Profile}></Stack.Screen>
         <Stack.Screen name="questions" component={Questions}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
    )
    
  } else {
    return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="login"
      >
        <Stack.Screen initialParams={
          {
          "login": login,
          

          }
        }
        name="login" component={Login}></Stack.Screen>
        <Stack.Screen 
        name="signup" 
        component={Signup}
        initialParams={
          {
            "setUser": setUser
          }
        }>
        
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
