import { View, Pressable, Text } from "react-native-web";
import { styles } from "../styles";


function Profile(props){
    console.log('profile')
    return(
        <View style={styles.containerView}>
            <Text>Profile</Text>
            <Pressable 
            onPress={()=>props.navigation.navigate('questions')}
            style={styles.button}>
                <Text>Complete Inventory</Text>
            </Pressable>
            <Pressable 
            onPress={()=>{props.navigation.navigate('track-answers')}}
            style={styles.button}>
                <Text>Track Answers</Text>
            </Pressable>
            <Pressable style={styles.button}> 
                <Text>Settings</Text>
            </Pressable>
        </View>
    )
}

export default Profile