import { useNavigation, CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native"
import { Button, Surface, TextInput } from "react-native-paper";
import Toast from "react-native-root-toast";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false)

  return <View
    style={{ width: "90%", alignContent: "center", alignItems: "center", alignSelf: "center" }}>
    <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 50, alignSelf: "center" }}>
      SIDBI Connect</Text>
    <Surface
      elevation={4}
      style={{ width: "95%", margin: 50, padding: 20 }}
    >
      <TextInput label={"Email Id or phone number"} mode='outlined' style={{ margin: 3 }}
        value={userId} onChangeText={(text) => setUserId(text)}></TextInput>
      {!isOtpSent && <Button mode='contained' style={{ margin: 10 }} onPress={() => {        
        setIsOtpSent(true)
      }} >Next</Button>}
      {isOtpSent && 
      <View> 
        <TextInput secureTextEntry={true} label="OTP" mode='outlined' style={{ margin: 3 }}
          value={otp} onChangeText={(text) => setOTP(text)}>
        </TextInput>
        <TextInput secureTextEntry={true} label="Password" mode='outlined' style={{ margin: 3 }}
          value={password} onChangeText={(text) => setPassword(text)}>
        </TextInput>
        <TextInput secureTextEntry={true} label="Confirm Password" mode='outlined' style={{ margin: 3 }}
          value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)}>
        </TextInput>
        <Button mode='contained' style={{ margin: 10 }} onPress={() => {        
          Toast.show("Password set sucessfully!");
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }]
            })
          );
        }} >Submit</Button>
      </View>}
    </Surface>
  </View>
}

export default ForgotPassword;