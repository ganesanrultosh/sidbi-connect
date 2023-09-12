import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Button, RadioButton, Surface, TextInput, useTheme } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import Footer from "./Footer";

const LeadBasicInfo = () => {

  const navigation = useNavigation();

  const [loanType, setLoanType] = useState("")
  const [customerType, setCustomerType] = useState("new")
  const [showLoanTypeDropDown, setShowLoanTypeDropDown] = useState(false);
  const theme = useTheme();


  let loanTypeDomain = [{
    label: 'Loan Type 1',
    value: 'Loan Type 1',
  }, {
    label: 'Loan Type 2',
    value: 'Loan Type 2',
  }];

  return <View style={{ flex: 1 }}><ScrollView><Surface
    elevation={4}
    style={{ width: "95%", margin: 10, padding: 20 }}
  >
    <ScrollView style={{ padding: 5 }}>
      <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>Basic Information</Text>
      <TextInput label={"PAN No (*)"} mode='outlined' style={{ marginBottom: 10 }}>

      </TextInput>
      <TextInput label={"Entity Name (*)"} mode='outlined' style={{ marginBottom: 10 }}>

      </TextInput>
      <TextInput label={"Loan Amount (₹) (*)"} mode='outlined' style={{ marginBottom: 10 }}>

      </TextInput>
      <View style={{marginBottom: 10}}>
      <DropDown
        label="Category"
        mode={"outlined"}
        visible={showLoanTypeDropDown}
        showDropDown={() => setShowLoanTypeDropDown(true)}
        onDismiss={() => setShowLoanTypeDropDown(false)}
        value={loanType}
        list={loanTypeDomain}
        setValue={setLoanType}
      />
      </View>
      <View style={{marginTop: 10, borderBlockColor: "black", borderWidth: 1, padding: 10, borderRadius: 3, backgroundColor: `${theme.colors.background}`}}>
        <RadioButton.Group onValueChange={customerType => setCustomerType(customerType)} value={customerType}>
          <Text style={{fontWeight: "bold", marginBottom: 5}}>Customer Type</Text>
          <View style={{ flexDirection: 'row', alignContent: 'center' }}>
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <Text>New Customer</Text>
            </View>
            <View style={{ flex: 1 }}>
              <RadioButton value="new" />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignContent: 'center' }}>
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <Text>Existing Customer</Text>
            </View>
            <View style={{ flex: 1 }}>
              <RadioButton value="existing" />
            </View>
          </View>
        </RadioButton.Group>
      </View>
    </ScrollView>
    <Button mode="contained" style={{ alignSelf: "flex-end", display: "flex", margin: 10 }} onPress={() => navigation.navigate('Lead: Contact Information' as never)}>Continue</Button>
  </Surface></ScrollView>
  <Footer/></View>
}

export default LeadBasicInfo;