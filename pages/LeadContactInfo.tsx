import React from "react";
import { ScrollView, Text } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Button, Surface, TextInput } from "react-native-paper";

const LeadContactInfo = () => {
  const navigation = useNavigation();
  return <Surface
    elevation={4}
    style={{ width: "95%", margin: 10, padding: 20 }}
  >
    <ScrollView style={{ padding: 5 }}>
      <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>Contact Information</Text>
      <TextInput label={"Email (*)"} mode='outlined' style={{ margin: 3 }}>

      </TextInput>
      <TextInput label={"Phone No (*)"} mode='outlined' style={{ marginHorizontal: 3 }}>

      </TextInput>
      <TextInput label={"Pincode (*)"} mode='outlined' style={{ margin: 3 }}>

      </TextInput>
      <TextInput label={"City (*)"} mode='outlined' style={{ margin: 3 }}>

      </TextInput>
      <TextInput label={"State (*)"} mode='outlined' style={{ margin: 3 }}>

      </TextInput>
      <TextInput label={"Address Details (*)"} mode='outlined' style={{ margin: 3 }} multiline={true}
    numberOfLines={4}>

      </TextInput>
    </ScrollView>
    <Button mode="contained" style={{alignSelf: "flex-end", display: "flex", margin: 10}} onPress={() => navigation.navigate('Lead: Submission' as never)}>Continue</Button>
  </Surface>
}

export default LeadContactInfo;