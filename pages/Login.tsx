import { useNavigation, CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native"
import { Button, Surface, TextInput } from "react-native-paper";

const Login = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  return <View
    style={{ width: "90%", alignContent: "center", alignItems: "center", alignSelf: "center" }}>
    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 50, alignSelf: "center" }}>
      SIDBI Connect</Text>
    <Surface
      elevation={4}
      style={{ width: "95%", margin: 50, padding: 20 }}
    >
      <Text style={{ fontWeight: "bold", margin: 5, alignSelf: "center" }}>Already a partner?</Text>
      <Text style={{ margin: 5, marginBottom: 15, alignSelf: "center" }}>Sign in to continue</Text>
      <TextInput label={"Email Id or phone number"} mode='outlined' style={{ margin: 3 }}
        value={userId} onChangeText={(text) => setUserId(text)}></TextInput>
      <TextInput secureTextEntry={true} label="Password" mode='outlined' style={{ margin: 3 }}
        value={password} onChangeText={(text) => setPassword(text)}>
      </TextInput>
      <Button onPress={() => navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      )} mode="contained" style={{margin: 10}} >Sign in</Button>
      <Button mode="outlined" style={{margin: 10}} onPress={() => {
        navigation.navigate(
          "Forgot Password" as never
        );
      }} >Forgot password?</Button>
    </Surface>
    <Surface
      elevation={4}
      style={{ width: "95%", margin: 0, padding: 20 }}
    >
      <Text style={{ fontWeight: "bold", alignSelf: "center", marginBottom: 10 }} >Become a partner</Text>
      <Button mode='contained' style={{ margin: 10 }} onPress={() => {        
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Registration: Basic Information' }],
          })
        );
      }} >Register</Button>
    </Surface>

  </View>
}

export default Login;