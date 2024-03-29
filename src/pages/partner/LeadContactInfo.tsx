import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../../components/CustomInput";
import { ScrollView, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Surface, useTheme } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LeadContactInfoProps, LeadContactInfoRouteProps } from "../navigation/NavigationProps";
import { Lead, leadDefaultValue } from "../../models/partner/Lead";
import CustomDropDownEditable from "../../components/CustomDropDownEditable";
import { useGetMasterQuery } from "../../slices/masterSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { saveLead } from "../../slices/leadCacheSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import BranchServices from "../../services/branchService";

const LeadContactInfo = (props : LeadContactInfoProps ) => {
  const navigation = useNavigation();
  const disptach = useAppDispatch();

  const theme = useTheme();
  
  const styles = StyleSheet.create({
    contactInfoSurface: { width: "90%", margin: 20, padding: 20 },
    header: { 
      color: `${theme.colors.onBackground}`,
      fontSize: 20, fontWeight: "bold", marginBottom: 20 },
    scrollView: { padding: 5 },
    continueButton: { alignSelf: "flex-end", display: "flex", margin: 10 }
  })
  

  const route = useRoute<LeadContactInfoRouteProps>();
  const { lead } = route.params;
  const { leads } = useAppSelector(state => state.persistedLeads);

  const initialValues = lead?.pan && leads[lead?.pan] ? {
    ...leadDefaultValue,
    ...leads[lead?.pan].lead
  } : {...leadDefaultValue}

  const [leadInfo, setLeadInfo] = useState<Lead>(initialValues)

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
      master.cities && master.cities?.map((value: any) => {
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
    emailId: yup
      .string()
      .email("Enter a valid email")
      .required('Email is required'),
    mobileNo: yup
      .string()
      .matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, "Enter a valid phone number")
      .required('Phone number is required'),
    pincode: yup
      .string()
      .matches(/^[1-9][0-9]{5}$/, "Enter a valid pincode")
      .required('Pincode is required'),
    city: yup
      .string()
      .required('City is required'),
    state: yup
      .string()
      .required('State is required'),
    officeAddress: yup
      .string()
      .required("Address is required")
  })

  return <Formik
    validationSchema={contactInfoValidationSchema}
    initialValues={initialValues}
    onSubmit={(values, form) => {
      let currentValues = {...leadInfo, ...values} as Lead
      form.validateForm()
      console.log("Navigating to submission", currentValues)
      disptach(saveLead(currentValues));
      setLeadInfo(currentValues)
      navigation.navigate(
        'LeadSubmission',
        {lead: currentValues})
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
          name="emailId"
          label="Email (*)"
        />
        <Field
          component={CustomInput}
          name="mobileNo"
          label="Phone No (*)"
        />
        <Field
          component={CustomInput}
          name="pincode"
          label="Pincode (*)"
          validateOnChange={true}
          onChange = {(value: any) => {
            if(/^[1-9][0-9]{5}$/.test(value)) {
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
          name="officeAddress"
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


export default LeadContactInfo;