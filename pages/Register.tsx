import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { Button, Surface } from "react-native-paper";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../components/CustomInput";
import CustomCheckBox from "../components/CustomCheckBox";

const Register = () => {

  const navigation = useNavigation();

  const registrationValidationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
      .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
      .matches(/\d/, "Password must have a number")
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      ,
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
    termsAccepted: yup.boolean().isTrue('Please read and accept the terms and condition')
  })

  const initialValue = {
    password: '',
    confirmPassword: '',
    termsAccepted: false
  }

  return <Formik
    validationSchema={registrationValidationSchema}
    initialValues={initialValue}
    onSubmit={values => {
      Toast.show('Registration sucessfully submitted.', { duration: Toast.durations.LONG })
      navigation.navigate('Login' as never)
    }}
  >
    {({
      values,
      handleSubmit,
      isValid
    }) => (<Surface
      elevation={4}
      style={styles.surface}
    >
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerText}>Complete registration</Text>
        <Field
          component={CustomInput}
          name="password"
          label="Password"
          secureTextEntry
        />
        <Field
          component={CustomInput}
          name="confirmPassword"
          label="Confirm Password"
          secureTextEntry
        />
        <Field
          component={CustomCheckBox}
          name="termsAccepted"
          rightText={"I/We accept the Terms and Conditions"}
        />
      </ScrollView>
      <Button 
        style={styles.registerButton} 
        onPress={(e: any) => handleSubmit(e)} 
        mode="contained">
          Register
      </Button>
    </Surface>)}
  </Formik>
}

const styles = StyleSheet.create(
  {
    surface: { width: "95%", margin: 10, padding: 20 },
    scrollView: { padding: 5 },
    headerText: { fontSize: 15, fontWeight: "bold", marginBottom: 10 },
    registerButton: { alignSelf: "flex-start", display: "flex", margin: 10 }
  }
)

export default Register;