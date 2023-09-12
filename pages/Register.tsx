import React from "react";
import { ScrollView, Text } from "react-native"
import { useNavigation } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
import Toast from "react-native-root-toast";
import { Button, Surface, TextInput } from "react-native-paper";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../components/CustomInput";

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
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      ,
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
      style={{ width: "95%", margin: 10, padding: 20 }}
    >
      <ScrollView style={{ padding: 5 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>Complete registration</Text>
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
        {/* <CheckBox
          style={{ flex: 1, padding: 10 }}
          isChecked={true}
          onClick={() => { }}
          rightText={"I/We accept the Terms and Conditions"}
        /> */}
      </ScrollView>
      <Button style={{ alignSelf: "flex-start", display: "flex", margin: 10 }} onPress={(e: any) => handleSubmit(e)} mode="contained">Register</Button>
    </Surface>)}
  </Formik>
}

export default Register;