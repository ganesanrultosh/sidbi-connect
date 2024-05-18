import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Surface, useTheme } from "react-native-paper";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../../components/CustomInput";
import CustomDropDown from "../../components/CustomDropDown";
import CustomRadioGroup from "../../components/CustomRadioGroup";
import { Lead, leadDefaultValue } from "../../models/partner/Lead";
import { saveLead } from "../../slices/leadCacheSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { LeadBasicInfoProps, LeadBasicInfoRouteProps } from "../navigation/NavigationProps";

const LeadBasicInfo = (props : LeadBasicInfoProps) => {

  const navigation = useNavigation();
  const theme = useTheme();
  const styles = StyleSheet.create({
    screenWrapper: {
      flex: 1,
      backgroundColor: '#FCFAFE',
    },
    formContainer: {
      width: '100%',
      height: '100%',
      paddingTop: 50,
      alignItems: 'center',
      rowGap: 10,
      paddingHorizontal: 20,
    },
    headerText: {
      color: `${theme.colors.onBackground}`,
      fontWeight: '500',
      fontSize: 25,
      textAlign: 'center',
    },
    continueButton: {},
  });

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
      .min(10, ({min}) => `Loan Amount should be atleast ${min} Lakhs (₹)`)
      .max(
        100,
        ({max}) => `Loan Amount should not be more than ${max} Lakhs (₹)`,
      )
      .required('Loan amount is required.'),
    // loanType: yup
    //   .string()
    //   .required('Loan Type is required'),
    // customerType: yup
    //   .string()
    //   .required('Customer Type is required')
  });

  return (
    <Formik
      validationSchema={basicInfoValidationSchema}
      initialValues={leadInfo}
      onSubmit={values => {
        let currentValues = {...leadInfo, ...values} as Lead;
        dispatch(saveLead(currentValues));
        setLeadInfo(currentValues);
        navigation.navigate('LeadContactInfo', {lead: currentValues});
      }}>
      {({values, handleSubmit, isValid}) => (
        <View style={styles.screenWrapper}>
          <View style={[styles.formContainer]}>
            <Text style={[styles.headerText]}>Basic Information</Text>
            <Field component={CustomInput} name="pan" label="PAN (*)" />
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
            <Button
              labelStyle={{fontSize: 16}}
              style={[styles.continueButton]}
              mode="contained"
              disabled={!isValid}
              onPress={(e: any) => handleSubmit(e)}>
              Continue
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
}

export default LeadBasicInfo;