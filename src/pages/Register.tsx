import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import { Button, Surface, useTheme } from "react-native-paper";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../components/CustomInput";
import CustomCheckBox from "../components/CustomCheckBox";
import { PartnerRegistrationProps, PartnerRegistrationRouteProps } from "./NavigationProps";
import { signupUser } from "../services/authService";

const Register = (props:PartnerRegistrationProps) => {

  const navigation = useNavigation();
  const route = useRoute<PartnerRegistrationRouteProps>();

  const theme = useTheme();

  const styles = StyleSheet.create(
    {
      surface: { width: "90%", margin: 20, padding: 20 },
      headerText: { 
            color: `${theme.colors.onBackground}`,
            fontSize: 20, fontWeight: "bold", marginBottom: 20 },
      scrollView: { padding: 5 },
      registerButton: { alignSelf: "flex-start", display: "flex", margin: 10 }
    }
  )

  const { partner } = route.params;

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
    validationSchema={registrationValidationSchema}
    initialValues={initialValue}
    onSubmit={async (values) => {
      await signupUser(values as Partner)
        .then((response) => response.json())
        .then(async (data : any) => {
          if(data.error) {
            Toast.show(data.error);
          } else {
            Toast.show('Registration sucessfully submitted.', { duration: Toast.durations.LONG })
            navigation.navigate('Login' as never)
          }
        }).catch((error : any) => {
            console.log(error)
            Toast.show(error, { duration: Toast.durations.LONG })
          }
        );
      console.log("Register", values)
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

export default Register;