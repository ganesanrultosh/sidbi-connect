import React from "react";
import { ScrollView, Text } from "react-native"
import { useNavigation } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
import Toast from "react-native-root-toast";
import { Button, Surface, TextInput } from "react-native-paper";

const Register = () => {

  const navigation = useNavigation();
  return <Surface
    elevation={4}
    style={{ width: "95%", margin: 10, padding: 20 }}
  >
    <ScrollView style={{ padding: 5 }}>
      <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>Complete registration</Text>
      <TextInput label={"Password (*)"} mode='outlined' style={{ margin: 3 }}>

      </TextInput>
      <TextInput label={"Confirm password (*)"} mode='outlined' style={{ marginHorizontal: 3 }}>

      </TextInput>
      <CheckBox
        style={{ flex: 1, padding: 10 }}
        isChecked={true}
        onClick={() => { }}
        rightText={"I/We accept the Terms and Conditions"}
      />
    </ScrollView>
    <Button style={{ alignSelf: "flex-start", display: "flex", margin: 10 }} onPress={() => {
      Toast.show('Registration sucessfully submitted.', { duration: Toast.durations.LONG })
      navigation.navigate('Login' as never)
    }} mode="contained">Register</Button>
  </Surface>
}

export default Register;