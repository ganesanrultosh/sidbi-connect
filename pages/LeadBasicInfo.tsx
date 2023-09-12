import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { Button, Surface, useTheme } from "react-native-paper";
import Footer from "./Footer";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../components/CustomInput";
import CustomDropDown from "../components/CustomDropDown";
import CustomRadioGroup from "../components/CustomRadioGroup";

const LeadBasicInfo = () => {

  const navigation = useNavigation();
  const theme = useTheme();

  let loanTypeDomain = [{
    label: 'Loan Type 1',
    value: 'Loan Type 1',
  }, {
    label: 'Loan Type 2',
    value: 'Loan Type 2',
  }];

  let customerValueList = [{
    label: 'New Customer',
    value: 'new',
  }, {
    label: 'Existing Customer',
    value: 'existing',
  }];

  const initialValue = {
    entityName: '',
    loanAmount: '',
    loandType: '',
    customerType: 'new'
  }

  const basicInfoValidationSchema = yup.object().shape({
    entityName: yup
      .string()
      .required('Entity Name is required.'),
    loanAmount: yup
      .number()
      .min(10, "Loan Amount should be atleast 10 Lakhs ₹")
      .max(100, "Loan Amount should not be more than 100 Lakhs ₹")
      .required('Loan amount is required.'),
    loanType: yup
      .string()
      .required('Loan Type is required'),
    customerType: yup
      .string()
      .required('Customer Type is required')
  });

  return <Formik
    validationSchema={basicInfoValidationSchema}
    initialValues={initialValue}
    onSubmit={values => {
      navigation.navigate('Lead: Contact Information' as never)
    }}
  >
    {({
      values,
      handleSubmit,
      isValid
    }) => (<View style={styles.viewStyle}>
      <ScrollView>
        <Surface elevation={4} style={styles.surfaceStyle}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.headerText}>Basic Information</Text>
            <Field
              component={CustomInput}
              name="entityName"
              label="Entity Name (*)"
            />
            <Field
              component={CustomInput}
              name="loanAmount"
              label="Loan Amount (Lakhs ₹) (*)"
            />
            <Field
              component={CustomDropDown}
              name="loanType"
              label="Loand Type (*)"
              list={loanTypeDomain}
            />
            <View style={styles.radioGroupEnclosure}>
              <Field
                component={CustomRadioGroup}
                name="customerType"
                label="Customer Type (*)"
                header={"Customer Type"}
                radioList={customerValueList}
              />
            </View>
          </ScrollView>
          <Button
            mode="contained"
            style={styles.continueButton}
            disabled={!isValid}
            onPress={(e: any) => handleSubmit(e)}>
            Continue
          </Button>
        </Surface>
      </ScrollView>
      <Footer />
    </View>)}
  </Formik>
}

const styles = StyleSheet.create({
  viewStyle: { flex: 1 },
  surfaceStyle: { width: "95%", margin: 10, padding: 20 },
  headerText: { fontSize: 15, fontWeight: "bold", marginBottom: 10 },
  scrollView: { padding: 5 },
  continueButton: { alignSelf: "flex-end", display: "flex", margin: 10 },
  radioGroupEnclosure: { marginTop: 10, borderBlockColor: "black", borderWidth: 1, padding: 10, borderRadius: 3 }
})

export default LeadBasicInfo;