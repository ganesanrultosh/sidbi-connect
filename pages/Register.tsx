import { TextInput, Surface, Box, Flex, Button, Wrap } from "@react-native-material/core"
import { Dropdown } from "react-native-material-dropdown";
import React from "react";
import { ScrollView, Text } from "react-native"
import { useNavigation } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
import Toast from "react-native-root-toast";

const Register = () => {

  const navigation = useNavigation();
  return <Surface
    elevation={6}
    category="medium"
    style={{ width: "95%", margin: 10, padding: 20 }}
  >
    <ScrollView style={{ padding: 5 }}>
      <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>Complete registration</Text>
      <TextInput label={"Password (*)"} variant='outlined' style={{ margin: 3 }}>

      </TextInput>
      <TextInput label={"Confirm password (*)"} variant='outlined' style={{ marginHorizontal: 3 }}>

      </TextInput>
      <CheckBox
        style={{ flex: 1, padding: 10 }}
        isChecked={true}
        onClick={() => { }}
        rightText={"I/We accept the Terms and Conditions"}
      />
    </ScrollView>
    {/* <Wrap m={2} spacing={5}> */}
      {/* <Button title="Back" variant="outlined" style={{width: "25%", alignSelf: "flex-start", display: "flex"}}  onPress={() => navigation.navigate('Registration: Contact Information' as never)}></Button> */}

      <Button title="Register" style={{ alignSelf: "flex-start", display: "flex" }} onPress={() => {
        Toast.show('Registration sucessfully submitted.', { duration: Toast.durations.LONG })
        navigation.navigate('Login' as never)
      }}></Button>
    {/* </Wrap> */}
  </Surface>
}

export default Register;