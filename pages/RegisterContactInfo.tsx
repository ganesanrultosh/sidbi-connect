import { TextInput, Surface, Box, Flex, Button, Wrap } from "@react-native-material/core"
import { Dropdown } from "react-native-material-dropdown";
import React from "react";
import { ScrollView, Text } from "react-native"
import { useNavigation } from "@react-navigation/native";

const RegisterContactInfo = () => {
  const navigation = useNavigation();
  return <Surface
    elevation={6}
    category="medium"
    style={{ width: "95%", margin: 10, padding: 20 }}
  >
    <ScrollView style={{ padding: 5 }}>
      <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>Contact Information</Text>
      <TextInput label={"Email (*)"} variant='outlined' style={{ margin: 3 }}>

      </TextInput>
      <TextInput label={"Phone No (*)"} variant='outlined' style={{ marginHorizontal: 3 }}>

      </TextInput>
      <TextInput label={"Pincode (*)"} variant='outlined' style={{ margin: 3 }}>

      </TextInput>
      <TextInput label={"City (*)"} variant='outlined' style={{ margin: 3 }}>

      </TextInput>
      <TextInput label={"State (*)"} variant='outlined' style={{ margin: 3 }}>

      </TextInput>
      <TextInput label={"Address Details (*)"} variant='outlined' style={{ margin: 3 }} multiline={true}
    numberOfLines={4}>

      </TextInput>
    </ScrollView>
    {/* <Wrap m={2} spacing={5}> */}
      {/* <Button title="Back" variant="outlined" style={{width: "25%", alignSelf: "flex-start", display: "flex"}}  onPress={() => navigation.navigate('Registration: Basic Information' as never)}></Button> */}
      <Button title="Continue" style={{alignSelf: "flex-end", display: "flex"}} onPress={() => navigation.navigate('Registration' as never)}></Button>
    {/* </Wrap> */}
  </Surface>
}

export default RegisterContactInfo;