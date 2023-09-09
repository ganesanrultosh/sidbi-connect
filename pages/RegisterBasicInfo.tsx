import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Button, Surface, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

const RegisterBasicInfo = () => {

  const navigation = useNavigation();

  const [category, setCategory] = useState("")
  const [showCategoryDropDown, setShowCategoryDropDown] = useState(false);
  const [subCategory, setSubCategory] = useState("")
  const [showSubCategoryDropDown, setShowSubCategoryDropDown] = useState(false);
  
  let categoryMaster = [{
    label: 'Entity',
    value: 'Entity',
  }, {
    label: 'Individual',
    value: 'Individual',
  }];

  

  let subCategoryMaster = [{
    label: 'Original Equipment Manufactures',
    value: 'Original Equipment Manufactures',
  }, {
    label: 'Charted Accounts',
    value: 'Charted Accounts',
  }, {
    label: 'Consultants',
    value: 'Consultants',
  }, {
    label: 'Industry Associations',
    value: 'Industry Associations',
  }, {
    label: 'Retired Bankers',
    value: 'Retired Bankers',
  }, {
    label: 'Other/Professional Individuals',
    value: 'Other/Professional Individuals',
  }];

  

  return <Surface
    elevation={4}
    style={{ width: "95%", margin: 10, padding: 20 }}
  >
    <ScrollView style={{ padding: 5 }}>
      <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>Basic Information</Text>
      <TextInput label={"PAN No (*)"} mode='outlined' style={{ marginBottom: 10 }}>

      </TextInput>
      <TextInput label={"Name of Individual/Entity"} mode='outlined' 
        style={{ marginBottom: 10 }}>

      </TextInput>
      <DropDown
        label="Category"
        mode={"outlined"}
        visible={showCategoryDropDown}
        showDropDown={() => setShowCategoryDropDown(true)}
        onDismiss={() => setShowCategoryDropDown(false)}
        value={category}
        list={categoryMaster}
        setValue={setCategory}
        dropDownStyle={{marginBottom: 5}}
      />
      <View style={{marginTop: 10}}>
      <DropDown
        label="Category"
        mode={"outlined"}
        visible={showSubCategoryDropDown}
        showDropDown={() => setShowSubCategoryDropDown(true)}
        onDismiss={() => setShowSubCategoryDropDown(false)}
        value={subCategory}
        list={subCategoryMaster}
        setValue={setSubCategory}
        dropDownStyle={{marginBottom: 5}}
      />
      </View>
      {
        category === "Entity" && 
        <TextInput label={"Key Person Name"} mode='outlined' style={{ marginTop: 10 }}>
        </TextInput>
      }

    </ScrollView>
    {/* <Button title="Back" variant="outlined" style={{width: "25%", alignSelf: "flex-start", display: "flex"}}></Button> */}
    <Button 
      mode="contained" 
      style={{ alignSelf: "flex-end", display: "flex", margin: 10 }} 
      onPress={() => navigation.navigate('Registration: Contact Information' as never)}>Continue</Button>

  </Surface>
}

export default RegisterBasicInfo;