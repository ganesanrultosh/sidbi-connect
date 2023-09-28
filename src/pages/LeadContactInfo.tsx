import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../components/CustomInput";
import { ScrollView, StyleSheet, Text } from "react-native";
import React from "react";
import { Button, Surface } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const LeadContactInfo = () => {
  const navigation = useNavigation();

  const contactInfoValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Enter a valid email")
      .required('Email is required'),
    phoneNo: yup
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
    email: '', 
    phoneNo: '', 
    pinCode: '', 
    city: '', 
    state: '',
    address: ''
  };

  return <Formik
    validationSchema={contactInfoValidationSchema}
    initialValues={initialValue}
    onSubmit={values => {
      navigation.navigate('LeadSubmission' as never)
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
          name="phoneNo"
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