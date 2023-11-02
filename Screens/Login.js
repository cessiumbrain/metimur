import { Text, SafeAreaView, TextInput, Pressable, Image } from "react-native";
import { styles } from "../styles";
import { useState, useEffect } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(props);
  });
  return (
    <SafeAreaView style={styles.containerView}>
      <Image source={require("../assets/logo-color.png")} style={styles.icon}></Image>
      <TextInput
        placeholder="email"
        autoComplete="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        style={styles.textInput}
      ></TextInput>
      <TextInput
        placeholder="password"
        autoComplete="current-password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        style={styles.textInput}
      ></TextInput>
      <Pressable 
        onPress={()=>{props.route.params.login(email, password)}}
        style={styles.button}>
        <Text>Login</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          props.navigation.navigate("signup");
        }}
        style={styles.button}
      >
        <Text>Signup</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default Login;
