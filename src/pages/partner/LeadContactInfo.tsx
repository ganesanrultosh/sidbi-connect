import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../../components/CustomInput";
import { ScrollView, StyleSheet, Text ,View} from "react-native";
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
import { useValidateLeadMutation } from "../../slices/leadSlice";
import { me } from "../../services/authService";
import Toast from 'react-native-root-toast';

const LeadContactInfo = (props : LeadContactInfoProps ) => {
  const navigation = useNavigation();
  const disptach = useAppDispatch();

  const theme = useTheme();

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
  const [validateLead, status] = useValidateLeadMutation()

  const {
    data : master, 
    error : masterError, 
    isLoading: isMasterLoading,
    isSuccess : isMasterSuccess,
   } = useGetMasterQuery(pincode || skipToken)

  useEffect(() => {
    if(refreshList && !isMasterLoading && isMasterSuccess) {
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
	const styles = StyleSheet.create({
    screenWrapper: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    registerLabel: {
      paddingTop: 20,
      height: 50,
      justifyContent: 'center',
    },
    registerText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000',
    },
    infoWrapper: {
      paddingTop: 50,
      paddingHorizontal: 30,
      rowGap: 20,
    },
    titleContainer: {
      height: 30,
      justifyContent: 'center',
    },
    titleText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
  });

  return (
    <Formik
      validationSchema={contactInfoValidationSchema}
      initialValues={initialValues}
      onSubmit={(values, form) => {
        let currentValues = {...leadInfo, ...values} as Lead;
        form.validateForm();

        disptach(saveLead(currentValues));
        setLeadInfo(currentValues);
        
        //Call API to validate PAN & Email duplicate.
        me()
        .then(response => response.json())
        .then((partner: Partner) => {
          if (partner.id) {
            let lead = {
              ...leadInfo,
              ...values,
              parentId: partner.id ? partner.id : 0,
              customerType: "new"
            };
            validateLead(lead)
              .unwrap()
              .then(() => navigation.navigate('LeadSubmission', {lead: currentValues}))
              .catch((error) => {
                Toast.show(error.data.error)
              })
          }

        })
        .catch((error: any) => {
          console.error('error at me() api in saveLeadToStore', error);
        });
      }}>
      {({values, handleSubmit, isValid}) => (
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          keyboardShouldPersistTaps="handled"
          style={[styles.screenWrapper]}>
          <View style={[styles.infoWrapper]}>
            <View style={[styles.titleContainer]}>
              <Text style={[styles.titleText, {fontSize: 18}]}>
                Contact Information
              </Text>
            </View>
            <View style={[{rowGap: 10}]}>
              <Field component={CustomInput} name="emailId" label="Email (*)" />
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
                onChange={(value: any) => {
                  if (/^[1-9][0-9]{5}$/.test(value)) {
                    setPinCode(value);
                    setRefreshList(true);
                  }
                }}
              />
              {masterError && (
                <>
                  <Text style={{color: 'red'}}>
                    City & State not found for the pin code.
                  </Text>
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
                  />
                </>
              )}
              {!masterError && (
                <>
                  <Field
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
                  />
                </>
              )}
              <Field
                component={CustomInput}
                name="officeAddress"
                label="Address Details (*)"
                multiline={true}
                numberOfLines={4}
              />
            </View>
            <Button
              labelStyle={{paddingVertical: 2}}
              style={{width: '50%', alignSelf: 'flex-end'}}
              mode="contained"
              disabled={!isValid}
              onPress={(e: any) => handleSubmit(e)}>
              Continue
            </Button>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}


export default LeadContactInfo;