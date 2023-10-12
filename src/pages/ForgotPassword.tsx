import { useNavigation, CommonActions } from "@react-navigation/native";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native"
import { Button, Surface } from "react-native-paper";
import Toast from "react-native-root-toast";
import CustomInput from "../components/CustomInput";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [isOtpSent, setIsOtpSent] = useState(false)

  const validateEmail = (email: string | undefined) => {
    return yup
      .string()
      .email()
      .isValidSync(email)
  };

  const validatePhone = (phone: number | undefined) => {
    return yup
      .string()
      .matches(
        /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
        "Enter a valid phone number")
      .isValidSync(phone)
  };

  const userIdValidationSchema = yup.object().shape({
    userId: yup
      .string()
      .required('Email Id or phone number is required')
      .test('email_or_phone', 'Email / Phone is invalid', (value) => {
        return validateEmail(value) || validatePhone(parseInt(value ?? '0'));
      })
  })

  const forgotPasswordValidationSchema = yup.object().shape({
    otp: yup
      .string()
      .required('OTP is required.')
      .min(4, ({ min }) => `OTP should be ${min} characters`)
      .max(4, ({ max }) => `OTP should be ${max} characters`),
    password: yup
      .string()
      .required('Password is required')
      .matches(/\w*[a-z]\w*/, "Password must have a small letter")
      .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
      .matches(/\d/, "Password must have a number")
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
    ,
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
  })

  const initialValue = {
    userId: '',
    otp: '',
    password: '',
    confirmPassword: ''
  }

  return <Formik
    validationSchema={forgotPasswordValidationSchema}
    initialValues={initialValue}
    onSubmit={values => {
      Toast.show("Password set sucessfully!");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        })
      );
    }}
  >
    {({
      values,
      handleSubmit,
      isValid
    }) => (<View style={styles.containerView}>
      <Surface elevation={4} style={styles.surface}>
        <Formik
          validationSchema={userIdValidationSchema}
          initialValues={initialValue}
          onSubmit={values => {
            setIsOtpSent(true)
          }}
        >
          {({
            values,
            handleSubmit,
            isValid
          }) => (<>
            <Field
              component={CustomInput}
              name="userId"
              label="Email Id or phone number (*)"
            />
            {!isOtpSent &&
              <Button
                mode='contained'
                style={{ margin: 10 }}
                disabled={!isValid}
                onPress={(e: any) => handleSubmit(e)} >
                Next
              </Button>}</>)}
        </Formik>
        {isOtpSent &&
          <View>
            <Field
              component={CustomInput}
              name="otp"
              label="OTP (*)"
              secureTextEntry
            />
            <Field
              component={CustomInput}
              name="password"
              label="Password (*)"
              secureTextEntry
            />
            <Field
              component={CustomInput}
              name="confirmPassword"
              label="Confirm Password (*)"
              secureTextEntry
            />
            <Button
              mode='contained'
              disabled={!isValid}
              style={{ margin: 10 }} onPress={(e: any) => {
                handleSubmit(e)
              }} >Submit</Button>
          </View>}
      </Surface>
    </View>)}
  </Formik>
}

const styles = StyleSheet.create(
  {
    containerView: { width: "90%", alignContent: "center", alignItems: "center", alignSelf: "center" },
    headerText: { fontWeight: "bold", fontSize: 20, marginTop: 50, alignSelf: "center" },
    surface: { width: "95%", margin: 50, padding: 20 }
  }
)

export default ForgotPassword;