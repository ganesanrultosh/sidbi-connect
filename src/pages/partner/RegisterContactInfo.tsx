import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Surface, useTheme} from 'react-native-paper';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import {
  PartnerRegistrationContactProps,
  PartnerRegistrationContactRouteProps,
} from '../navigation/NavigationProps';
import {skipToken} from '@reduxjs/toolkit/query';
import {useGetMasterQuery} from '../../slices/masterSlice';
import CustomDropDownEditable from '../../components/CustomDropDownEditable';

const RegisterContactInfo = (props: PartnerRegistrationContactProps) => {
  const navigation = useNavigation();
  const route = useRoute<PartnerRegistrationContactRouteProps>();

  const theme = useTheme();

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

  const {partner} = route.params;

  const [pincode, setPinCode] = useState<number>();
  const [states, setStates] = useState<any>();
  const [cities, setCities] = useState<any>();
  const [refreshList, setRefreshList] = useState(false);

  const {
    data: master,
    error: masterError,
    isLoading: isMasterLoading,
    isSuccess: isMasterSuccess,
  } = useGetMasterQuery(pincode || skipToken);

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
    username: yup
      .string()
      .email("Enter a valid email")
      .required('Email is required'),
    partnerMobileNo: yup
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

  const initialValue = { 
    pan: '', 
    username: '', 
    category: '', 
    subCategory: '', 
    keyPerson: '',
    mobileNo: '', 
    pinCode: undefined, 
    city: '', 
    state: '',
    address: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    ...partner
  };

  return (
    <Formik
      validationSchema={contactInfoValidationSchema}
      initialValues={initialValue}
      onSubmit={values => {
        navigation.navigate('Register', {partner: values as Partner});
      }}>
      {({values, handleSubmit, isValid}) => (
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          keyboardShouldPersistTaps="handled"
          style={[styles.screenWrapper]}>
          <View style={[styles.registerLabel]}>
            <Text style={[styles.registerText]}>Registration</Text>
          </View>
          <View style={[styles.infoWrapper]}>
            <View style={[styles.titleContainer]}>
              <Text style={[styles.titleText]}>Contact Information</Text>
            </View>
            <View style={[{rowGap: 10}]}>
              <Field
                component={CustomInput}
                name="username"
                label="Email (*)"
                autoCapitalize="none"
              />
              <Field
                component={CustomInput}
                name="partnerMobileNo"
                label="Phone No (*)"
              />
              <Field
                component={CustomInput}
                name="pinCode"
                label="Pincode (*)"
                validateOnChange={true}
                onChange={(value: any) => {
                  if (/^[1-9][0-9]{5}$/.test(value)) {
                    console.log(value);
                    setPinCode(value);
                    setRefreshList(true);
                  }
                }}
              />
              {isMasterLoading && <Text>Loading city and state ...</Text>}
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
                name="address"
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
};

export default RegisterContactInfo;
