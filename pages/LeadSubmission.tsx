import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Button, RadioButton, Surface, Switch, TextInput, useTheme } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import CheckBox from "react-native-check-box";

const LeadSubmission = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  
  const [inputDate, setInputDate] = useState<Date>();
  const [isMin3Years, setIsMin3Years] = React.useState(false);
  const onToogleMin3Years = () => setIsMin3Years(!isMin3Years);
  const [is12MonthsBankStatement, setIs12MonthsBankStatement] = React.useState(false);
  const onToogle12MonthsBankStatement = () => setIs12MonthsBankStatement(!is12MonthsBankStatement);
  const [isGSTRegistered, setIsGSTRegistered] = React.useState(false);
  const onToogleGSTRegistered = () => setIsGSTRegistered(!isGSTRegistered);
  const [filledBy, setFilledBy] = useState("TPE")
  const [concentSent, setConcentSent] = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(false)

  return <Surface
    elevation={4}
    style={{ width: "95%", margin: 10, padding: 20 }}
  >
    <ScrollView>
      <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 3 }}>Submission</Text>
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', marginBottom: 10 }}>
        <DatePickerInput
          locale="en-In"
          label="Date of incorporation"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
          mode="outlined"
        />
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'center', marginBottom: 10 }}>
        <View style={{ flex: 7, alignSelf: 'flex-start' }}>
          <Text style={{ fontSize: 16 }}>Does the customer have Min 3 years of Income tax return filing?</Text>
        </View>
        <View style={{ flex: 3, alignSelf: 'flex-start' }}>
          <Switch style={{ marginBottom: 20 }} value={isMin3Years} onValueChange={onToogleMin3Years} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'center', marginBottom: 10 }}>
        <View style={{ flex: 7, alignSelf: 'flex-start' }}>
          <Text style={{ fontSize: 16 }}>Does the customer have most recent 12 months (till last month) bank statement?</Text>
        </View>
        <View style={{ flex: 3, alignSelf: 'flex-start' }}>
          <Switch style={{ marginBottom: 20 }} value={is12MonthsBankStatement} onValueChange={onToogle12MonthsBankStatement} />
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignContent: 'center', marginBottom: 10 }}>
        <View style={{ flex: 7, alignSelf: 'flex-start' }}>
          <Text style={{ fontSize: 16 }}>Is the customer registered under GST?</Text>
        </View>
        <View style={{ flex: 3, alignSelf: 'flex-start' }}>
          <Switch style={{ marginBottom: 20 }} value={isGSTRegistered} onValueChange={onToogleGSTRegistered} />
        </View>
      </View>
      <View style={{marginTop: 10, borderBlockColor: "black", borderWidth: 1, padding: 10, borderRadius: 10, backgroundColor: `${theme.colors.background}`}}>
        <RadioButton.Group onValueChange={filledBy => setFilledBy(filledBy)} value={filledBy}>
          <Text style={{fontWeight: "bold", marginBottom: 5}}>Who will be filling the online loan application?</Text>
          <View style={{ flexDirection: 'row', alignContent: 'center' }}>
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <Text>Partner</Text>
            </View>
            <View style={{ flex: 1 }}>
              <RadioButton value="TPE" />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignContent: 'center' }}>
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <Text>Customer</Text>
            </View>
            <View style={{ flex: 1 }}>
              <RadioButton value="customer" />
            </View>
          </View>
        </RadioButton.Group>
        {!concentSent && <Button mode="contained-tonal" style={{width: "50%", alignSelf: "center", marginTop: 10}} onPress={() => {setConcentSent(true)}}>Get cocent</Button>}
        {concentSent && <TextInput label={"OTP (*)"} mode='outlined' style={{ marginBottom: 10 }}>
        </TextInput>}
      </View>
      <CheckBox
        style={{ flex: 1, padding: 10 }}
        isChecked={termsAgreed}
        onClick={() => { setTermsAgreed(!termsAgreed) }}
        rightText={"I/We accept the Terms and Conditions"}
      />
      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <View style={{ flex: 2, alignSelf: 'flex-start' }}>
          <Button mode="contained" style={{ alignSelf: "flex-start", display: "flex", marginTop: 10 }} onPress={() => navigation.navigate('Home' as never)} disabled={!concentSent || !termsAgreed}>Submit</Button>
        </View>
        <View style={{ flex: 4, alignSelf: 'flex-start' }}>
          <Button mode="outlined" style={{ alignSelf: "flex-start", display: "flex", marginTop: 10 }} onPress={() => navigation.navigate('Home' as never)}>Cancel</Button>
        </View>
      </View>
    </ScrollView>
  </Surface>
}

export default LeadSubmission;