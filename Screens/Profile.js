import { View, Pressable, Text } from "react-native-web";
import { styles } from "../styles";

function Profile(props){
    console.log('profile')
    return(
        <View style={styles.containerView}>
            <Text>Profile</Text>
            <Pressable style={styles.button}>
                <Text>Complete Inventory</Text>
            </Pressable>
        </View>
    )
}

export default Profile