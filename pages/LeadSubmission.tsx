import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Button, Surface, useTheme } from "react-native-paper";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomDropDown from "../components/CustomDropDown";
import CustomRadioGroup from "../components/CustomRadioGroup";
import CustomerDataPicker from "../components/CustomerDataPicker";
import CustomerSwitch from "../components/CustomerSwitch";
import CustomInput from "../components/CustomInput";
import CustomCheckBox from "../components/CustomCheckBox";

const LeadSubmission = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [concentSent, setConcentSent] = useState(false)
  
  let branchDomain = [{
    label: 'Chennai',
    value: 'Chennai',
  }, {
    label: 'Lucknow',
    value: 'Lucknow',
  }];

  let filledByList = [{
    label: 'Partner',
    value: 'TPE',
  }, {
    label: 'Customer',
    value: 'customer',
  }];

  const initialValues = {
    branch: '',
    dataOfIncorporation: '',
    min3YrsIT: false,
    recent3YrsBankStmt: false,
    isRegisteredUnderGST: false,
    filledBy: 'customer',
    termsAgreed: false
  }

  const submissionValidationSchema = yup.object().shape({
    branch: yup
      .string()
      .required('Branch is required.'),
    dateOfIncorporation: yup.date().required('Date of incorporation required'),
    min3YrsIT: yup
      .boolean()
      .isTrue('Customer should have 3 yrs IT Returns'),
    recent3YrsBankStmt: yup
      .boolean()
      .isTrue('Customer should have 3 yrs bank statement'),
    isRegisteredUnderGST: yup
      .boolean()
      .isTrue('Customer should be registered under GST'),
    filledBy: yup
      .string()
      .required('Filled by is required'),
    otp: yup
      .string()
      .required('OTP is required.')
      .min(4, ({ min }) => `OTP should be ${min} characters`)
      .max(4, ({ max }) => `OTP should be ${max} characters`),
    termsAgreed: yup
      .boolean()
      .isTrue('Please read and accept the terms'),
  })

  return <Formik
    validationSchema={submissionValidationSchema}
    initialValues={initialValues}
    onSubmit={() => {
      navigation.navigate('Home' as never)
    }}
  >
    {({
      handleSubmit,
      isValid
    }) => (<Surface elevation={4} style={styles.surface}
    >
      <ScrollView>
        <Text style={styles.header}>Submission</Text>
        <Field
          component={CustomDropDown}
          name="branch"
          label="Branch (*)"
          list={branchDomain}
        />
        <Field
          component={CustomerDataPicker}
          name="dateOfIncorporation"
          label="Date of incorporation"
        />
        <Field
          component={CustomerSwitch}
          name="min3YrsIT"
          label="Does the customer have Min 3 years of Income tax return filing?"
        />
        <Field
          component={CustomerSwitch}
          name="recent3YrsBankStmt"
          label="Does the customer have most recent 12 months (till last month) bank statement?"
        />
        <Field
          component={CustomerSwitch}
          name="isRegisteredUnderGST"
          label="Is the customer registered under GST?"
        />
        <View style={{ marginTop: 10, borderBlockColor: "black", borderWidth: 1, padding: 10, borderRadius: 10, backgroundColor: `${theme.colors.background}` }}>
          <Field
            component={CustomRadioGroup}
            name="filledBy"
            header={"Who will be filling the online loan application?"}
            radioList={filledByList}
          />
          {!concentSent && <Button 
            mode="contained-tonal" 
            style={{ width: "50%", alignSelf: "center", marginTop: 10 }} 
            onPress={() => { setConcentSent(true) }}>Get cocent</Button>}
          {concentSent && 
          <Field
            component={CustomInput}
            name="otp"
            label="OTP (*)"
          />}
        </View>
        <Field
            component={CustomCheckBox}
            name="termsAgreed"
            rightText={"I/We accept the Terms and Conditions"}
          />
        <View style={styles.actionContainer}>
          <View style={styles.buttonContainer}>
            <Button 
              mode="contained" 
              style={styles.button} 
              disabled={!isValid}
              onPress={(e:any) => handleSubmit(e)}>
                Submit
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button 
              mode="outlined" 
              style={styles.button} 
              onPress={() => navigation.navigate('Home' as never)}>
                Cancel
            </Button>
          </View>
        </View>
      </ScrollView>
    </Surface>)}
  </Formik>
}

const styles = StyleSheet.create({
  surface: { width: "95%", margin: 10, padding: 20 },
  header: { fontSize: 15, fontWeight: "bold", marginBottom: 3 },
  actionContainer: { flexDirection: 'row', alignContent: 'center' },
  buttonContainer: { flex: 2, alignSelf: 'flex-start' },
  button: { alignSelf: "flex-start", display: "flex", marginTop: 10 }
})

export default LeadSubmission;