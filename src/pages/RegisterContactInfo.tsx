import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Surface, useTheme } from "react-native-paper";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../components/CustomInput";
import { PartnerRegistrationContactProps, PartnerRegistrationContactRouteProps } from "./NavigationProps";

const RegisterContactInfo = (props: PartnerRegistrationContactProps) => {

  const navigation = useNavigation();
  const route = useRoute<PartnerRegistrationContactRouteProps>();

  const theme = useTheme();

  const styles = StyleSheet.create({
    contactInfoSurface: { width: "90%", margin: 20, padding: 20 },
    header: { 
        color: `${theme.colors.onBackground}`,
        fontSize: 20, fontWeight: "bold", marginBottom: 20 },
    scrollView: { padding: 5 },
  })
  

  const { partner } = route.params;

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

  return <Formik
    validationSchema={contactInfoValidationSchema}
    initialValues={initialValue}
    onSubmit={values => {
      navigation.navigate(
        'Register',
        {partner: values as Partner})
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
          name="username"
          label="Email (*)"
          autoCapitalize='none'
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
        />
        <Field
          component={CustomInput}
          name="city"
          label="City (*)"
        />
        <Field
          component={CustomInput}
          name="state"
          label="State (*)"
        />
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
        style={{ alignSelf: "flex-end", display: "flex", margin: 10 }} 
        disabled={!isValid}
        onPress={(e:any) => handleSubmit(e)}>
          Continue
      </Button>
    </Surface>)}
  </Formik>
}

export default RegisterContactInfo;