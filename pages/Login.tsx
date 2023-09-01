import { TextInput, Button, Pressable, Box, Surface, Wrap } from "@react-native-material/core"
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useState } from "react";
import { Text } from "react-native"

const Login = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  return <Box
    style={{ alignContent: "center", alignItems: "center" }}>
    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 50 }}>
      SIDBI Connect</Text>
    <Surface
      elevation={6}
      category="medium"
      style={{ width: "95%", margin: 50, padding: 20 }}
    >
      <Box style={{ margin: 0, width: "95%", alignItems: "center", alignContent: "center" }}>
        <Text style={{ fontWeight: "bold", margin: 5 }}>Already a partner?</Text>
        <Text style={{ marginBottom: 15 }}>Sign in to continue</Text>
      </Box>
      <TextInput label={"Email Id or phone number"} variant='outlined' style={{ margin: 3 }}
        value={userId} onChangeText={(text) => setUserId(text)}></TextInput>
      <TextInput secureTextEntry={true} label="Password" variant='outlined' style={{ margin: 3 }}
        value={password} onChangeText={(text) => setPassword(text)}>
      </TextInput>
      <Wrap style={{ width: "95%", padding: 3 }} spacing={20}>
        <Button title="Sign in" onPress={() => navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        )} />
        <Pressable>
          <Text style={{verticalAlign: "bottom", padding: 5, borderRadius: 3 }}>Forgot password?</Text></Pressable>
      </Wrap>
    </Surface>
    <Surface
      elevation={6}
      category="medium"
      style={{ width: "95%", margin: 0, padding: 20 }}
    >
      <Box style={{ margin: 5, width: "95%", alignItems: "center", alignContent: "center" }}>
        <Text style={{ fontWeight: "bold" }} >Register to become a partner</Text>
        {/* <Text style={{ marginBottom: 15 }}>Register to continue</Text> */}
      </Box>
      <Button title="Register" variant='outlined' style={{ margin: 3 }} onPress={() => {        
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Registration: Basic Information' }],
          })
        );
      }}></Button>
    </Surface>

  </Box>
}

export default Login;