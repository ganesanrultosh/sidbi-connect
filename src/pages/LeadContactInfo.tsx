import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../components/CustomInput";
import { ScrollView, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Surface } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LeadContactInfoProps, LeadContactInfoRouteProps } from "./NavigationProps";
import { Lead } from "../models/Lead";
import CustomDropDownEditable from "../components/CustomDropDownEditable";
import { useGetMasterQuery } from "../slices/masterSlice";
import { skipToken } from "@reduxjs/toolkit/query";

const LeadContactInfo = (props : LeadContactInfoProps ) => {
  const navigation = useNavigation();

  const route = useRoute<LeadContactInfoRouteProps>();

  const { lead } = route.params;

  const [pincode, setPinCode] = useState<number>()
  const [states, setStates] = useState<any>()
  const [cities, setCities] = useState<any>()
  const [refreshList, setRefreshList] = useState(false)

  const {
    data : master, 
    error : masterError, 
    isLoading: isMasterLoading,
    isSuccess : isMasterSuccess,
   } = useGetMasterQuery(pincode || skipToken)

  useEffect(() => {
    console.log("-----", refreshList, isMasterLoading, isMasterSuccess, master)
    if(refreshList && !isMasterLoading && isMasterSuccess) {
      console.log("useeffect", "----")
      let stateList: any = [];
      master && stateList.push({
        label: master.state,
        value: master.state
      })
      stateList.push({
        label: "Type your own",
        value: "custom"
      })
      setStates(stateList);
      let cityList : any = [];
      master.cities && master.cities?.map((value) => {
        cityList.push({
          label: value,
          value
        })
      })
      cityList.push({
        label: "Type your own",
        value: "custom"
      })
      setCities(cityList)
      setRefreshList(false)
    }
  }, [master])

  const contactInfoValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required('Email is required'),
    mobileNo: yup
      .string()
      .matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, "Enter a valid phone number")
      .required('Phone number is required'),
    pinCode: yup
      .string()
      .matches(/^[1-9][0-9]{5}$/, "Enter a valid pincode")
      .required('Pincode is required'),
    city: yup
      .string()
      .required('City is required'),
    state: yup
      .string()
      .required('State is required'),
    address: yup
      .string()
      .required("Address is required")
  })

  const initialValues = {
    name: "",
    pan: "",
    loanAmount: undefined,
    loanType: "",
    customerType: "",
    itrFiling: "",
    bankStatement: "",
    gstRegime: "",
    mobileNo: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    dateOfIncorp: undefined,
    applicationFillingBy: "",
    branchName: "",
    customerConcent: "",
    otp: "",
    ...lead
  }

  return <Formik
    validationSchema={contactInfoValidationSchema}
    initialValues={initialValues}
    onSubmit={values => {
      navigation.navigate(
        'LeadSubmission',
        {lead: values as Lead})
    }}
  >
    {({
      values,
      handleSubmit,
      isValid
    }) => (<Surface
      elevation={4}
      style={styles.contactInfoSurface}
    >
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>Contact Information</Text>
        <Field
          component={CustomInput}
          name="email"
          label="Email (*)"
        />
        <Field
          component={CustomInput}
          name="mobileNo"
          label="Phone No (*)"
        />
        <Field
          component={CustomInput}
          name="pinCode"
          label="Pincode (*)"
          validateOnChange={true}
          onChange = {(value: any) => {
            if(/^[1-9][0-9]{5}$/.test(value)) {
              console.log(value)
              setPinCode(value)
              setRefreshList(true)
            }
          } }
        />
        {masterError && 
          <><Text style={{color: 'red'}}>City & State not found for the pin code.</Text>
          <Field
          component={CustomInput}
          name="city"
          label="City (*)"
          enableReinitialize
          disabled={isMasterLoading}
        />
        <Field
          component={CustomInput}
          name="state"
          label="State (*)"
          enableReinitialize
          disabled={isMasterLoading}
        /></>
        }
        {!masterError && <><Field
          component={CustomDropDownEditable}
          name="city"
          label="City (*)"
          list={cities}
          enableReinitialize
          clearValue={refreshList}
          disabled={isMasterLoading}
        />
        <Field
          component={CustomDropDownEditable}
          name="state"
          label="State (*)"
          list={states}
          enableReinitialize
          clearValue={refreshList}
          disabled={isMasterLoading}
        /></>}
        <Field
          component={CustomInput}
          name="address"
          label="Address Details (*)"
          multiline={true}
          numberOfLines={4}
        />
      </ScrollView>
      <Button 
        mode="contained" 
        style={styles.continueButton} 
        disabled={!isValid}
        onPress={(e:any) => handleSubmit(e)}>
          Continue
      </Button>
    </Surface>)}
  </Formik>
}

const styles = StyleSheet.create({
  contactInfoSurface: { width: "95%", margin: 10, padding: 20 },
  scrollView: { padding: 5 },
  header: { fontSize: 15, fontWeight: "bold", marginBottom: 10 },
  continueButton: { alignSelf: "flex-end", display: "flex", margin: 10 }
})



export default LeadContactInfo;