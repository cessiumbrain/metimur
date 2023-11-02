import { SafeAreaView, Text, TextInput, Pressable } from "react-native-web";
import { styles } from "../styles";
import { supabase } from "../App";
import { useState } from "react";


function Signup(props){
    console.log(props)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [rePassword, setRePassword] = useState()
    const [currentError, setCurrentError] = useState('')

    async function submitForm(){
        const emailPattern = new RegExp('^.+@.+$')
        const passwordPattern = RegExp('^.{6,}$')
        
        if(!emailPattern.test(email)){
            console.log(emailPattern.test(email), email)
            setCurrentError('enter valid email')
            return
        }
        if(!passwordPattern.test(password)){
            setCurrentError('password must contain at least six characters')
            return
        }
        if(password!=rePassword){
            setCurrentError('passwords don\'t match')
            return
        }

        let { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })
        if(data){
            props.route.params.setUser(data)
        } else {
            setCurrentError('database error has occured')
        }
        
  
        
    }

    return(
        <SafeAreaView style={styles.containerView}>
            <TextInput
            style={styles.input}
            placeholder="email"
            onChange={(e)=>{
                setEmail(e.target.value)
            }}></TextInput>
            <TextInput
            placeholder="password"
            style={styles.input}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}></TextInput>
            <TextInput
            onChange={(e)=>{
                setRePassword(e.target.value)
            }}
            style={styles.input}
            placeholder="re-enter password"></TextInput>
            <Pressable
            onPress={()=>{
               submitForm()
            }}
            style={styles.button}>
                <Text>Sign Up</Text>
            </Pressable>
            <Pressable
            onPress={()=>{
                props.navigation.navigate('home')
            }}
            style={styles.button}>
                <Text>Back</Text>
            </Pressable>
            <Text style={styles.errorText}>{currentError}</Text>
        </SafeAreaView>
    )
}

export default Signup