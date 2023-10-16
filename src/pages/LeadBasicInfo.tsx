import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Surface, useTheme } from "react-native-paper";
import Footer from "./Footer";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../components/CustomInput";
import CustomDropDown from "../components/CustomDropDown";
import CustomRadioGroup from "../components/CustomRadioGroup";
import { Lead, leadDefaultValue } from "../models/Lead";
import { saveLead } from "../slices/leadCacheSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { LeadBasicInfoProps, LeadBasicInfoRouteProps } from "./NavigationProps";

const LeadBasicInfo = (props : LeadBasicInfoProps) => {

  const navigation = useNavigation();
  const theme = useTheme();
  const styles = StyleSheet.create({
    viewStyle: { flex: 1 },
    surfaceStyle: { width: "90%", margin: 20, padding: 20 },
    headerText: { 
      color: `${theme.colors.onBackground}`,
      fontSize: 20, fontWeight: "bold", marginBottom: 20 },
    scrollView: { padding: 5 },
    continueButton: { alignSelf: "flex-end", display: "flex", margin: 10 },
    radioGroupEnclosure: { marginTop: 10, borderBlockColor: "black", borderWidth: 1, padding: 10, borderRadius: 3 }
  })

  const dispatch = useAppDispatch();
  const route = useRoute<LeadBasicInfoRouteProps>();
  const { lead } = route.params;
  const { leads } = useAppSelector(state => state.persistedLeads);

  let loanTypeDomain = [{
    label: 'Machinery Loan',
    value: 'ML',
  }, {
    label: 'Project Loan',
    value: 'PL',
  }];

  let customerValueList = [{
    label: 'New Customer',
    value: 'new',
  }, {
    label: 'Existing Customer',
    value: 'existing',
  }];

  const initialValues = lead?.pan && leads[lead?.pan] ? {
    ...leadDefaultValue,
    ...leads[lead?.pan].lead
  } : {...leadDefaultValue}

  const [leadInfo, setLeadInfo] = useState<Lead>(initialValues)

  const basicInfoValidationSchema = yup.object().shape({
    pan: yup
      .string()
      .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Please enter valid PAN")
      .required('PAN is Required'),
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
    initialValues={leadInfo}
    onSubmit={values => {
      let currentValues = {...leadInfo, ...values} as Lead
      dispatch(saveLead(currentValues));
      setLeadInfo(currentValues)
      navigation.navigate(
        'LeadContactInfo',
        {lead: currentValues})
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
              name="pan"
              label="PAN (*)"
            />
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
              label="Loan Type (*)"
              enableReinitialize
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
      {/* <Footer /> */}
    </View>)}
  </Formik>
}

export default LeadBasicInfo;