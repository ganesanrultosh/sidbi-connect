import { TextInput, Surface, Box, Flex, Button, Wrap } from "@react-native-material/core"
import { Dropdown } from "react-native-material-dropdown";
import React, { useState } from "react";
import { ScrollView, Text } from "react-native"
import { useNavigation } from "@react-navigation/native";

const RegisterBasicInfo = () => {

  const navigation = useNavigation();

  const [category, setCategory] = useState("")

  let categoryMaster = [{
    value: 'Entity',
  }, {
    value: 'Individual',
  }];

  let subCategoryMaster = [{
    value: 'Original Equipment Manufactures',
  }, {
    value: 'Charted Accounts',
  }, {
    value: 'Consultants',
  }, {
    value: 'Industry Associations',
  }, {
    value: 'Retired Bankers',
  }, {
    value: 'Other/Professional Individuals',
  }];

  return <Surface
    elevation={6}
    category="medium"
    style={{ width: "95%", margin: 10, padding: 20 }}
  >
    <ScrollView style={{ padding: 5 }}>
      <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>Basic Information</Text>
      <TextInput label={"PAN No (*)"} variant='outlined' style={{ margin: 3 }}>

      </TextInput>
      <TextInput label={"Name of Individual/Entity"} variant='outlined' style={{ marginHorizontal: 3 }}>

      </TextInput>
      <Flex
        style={{
          marginVertical: 5,
          paddingVertical: 0,
          marginHorizontal: 3,
          paddingHorizontal: 3
        }}><Dropdown data={categoryMaster} label="Category" onChangeText={(text) => setCategory(text)}></Dropdown>
      </Flex>
      <Flex
        style={{
          marginVertical: 5,
          paddingVertical: 0,
          marginHorizontal: 3,
          paddingHorizontal: 3
        }}><Dropdown data={subCategoryMaster} label="Sub Category"></Dropdown>
      </Flex>
      {category === "Entity" && <TextInput label={"Key Person Name"} variant='outlined' style={{ margin: 3 }}>
      </TextInput>}
      
    </ScrollView>
      {/* <Button title="Back" variant="outlined" style={{width: "25%", alignSelf: "flex-start", display: "flex"}}></Button> */}
      <Button title="Continue" style={{alignSelf: "flex-end", display: "flex"}} onPress={() => navigation.navigate('Registration: Contact Information' as never)}></Button>
    
  </Surface>
}

export default RegisterBasicInfo;