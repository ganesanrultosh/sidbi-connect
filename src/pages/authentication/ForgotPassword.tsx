import { useNavigation, CommonActions } from "@react-navigation/native";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native"
import { Button, Surface } from "react-native-paper";
import Toast from "react-native-root-toast";
import CustomInput from "../../components/CustomInput";
import { forgotPassword, forgotPasswordOtp } from '../../services/authService';
import encrypt from '../../components/Authentication/passwordUtil';

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
      .required('Email Id is required')
      .test('email_or_phone', 'Email is invalid', value => {
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
    onSubmit={async values => {
      await encrypt(values.password)
      .then( async encryptedValues => {
        await forgotPassword({
          username: values.userId,
          otp: values.otp,
          password : encryptedValues.password,
          saltkey : encryptedValues.key
        })
        .then(response => {
          return response.json()})
        .then(data=>{
          if(data && data.message){
            switch (data.message) {
              case "Password reset successful":
                Toast.show(data.message);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                  })
                );
                break;
              case "User not active":
                Toast.show(data.message);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                  })
                );
              case "User not found":
                Toast.show(data.message);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                  })
                );
              default:
                Toast.show("Something went wrong. Try later");
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                  })
                );
                break;
            }
          }else if(data && data.error){
            Toast.show(data.error);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }]
              })
            );
          }
        })
        .catch(error => {
          console.log("Error resetting password, ERR", error);
          Toast.show(error);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }]
            })
          );
        })
      });
    }}
  >
    {({
      values,
      handleSubmit,
      isValid
    }) => (<View style={styles.containerView}>
     
        <Formik
          validationSchema={userIdValidationSchema}
          initialValues={initialValue}
          onSubmit={ async values => {
            await forgotPasswordOtp({username: values.userId})
            .then(response => response.json())
            .then(data =>  {
              if(data && data.message){
                switch (data.message) {
                  case "OTP Sent sucessfully!":
                    initialValue.userId = values.userId;
                    setIsOtpSent(true);
                    Toast.show(data.message);
                    break;
                  case "User not active":
                    Toast.show(data.message);
                    setIsOtpSent(false);
                    break;
                  case "User not found":
                    Toast.show(data.message);
                    setIsOtpSent(false);
                    break;
                  default:
                    Toast.show("Something went wrong. Try later");
                    setIsOtpSent(false);
                    break;
                }
              }else if(data && data.error){
                Toast.show(data.error);
                setIsOtpSent(false);
              }
            }).catch(error=>{
              console.log("Error sending OTP, ERR ", error);
              Toast.show(error);
              setIsOtpSent(false);
            });
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
              label="Email Id (*)"
            />
            {!isOtpSent &&
              <Button
                mode='contained'
                style={{width: 100}}
                disabled={!isValid}
                onPress={(e: any) => handleSubmit(e)} >
                Next
              </Button>}</>)}
        </Formik>
        {isOtpSent &&
          <View style={styles.setPasswordView}>
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
                style={{width: 100}}
                mode="contained"
                disabled={!isValid}
                onPress={(e: any) => {
                  handleSubmit(e);
                }}>
                Submit
              </Button>
            </View>}
      
    </View>)}
  </Formik>
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 10,
    paddingVertical: 50,
    paddingHorizontal: 50,
  },
  setPasswordView: {
    width: '100%',
    alignItems: 'center',
    rowGap: 5,
    paddingVertical: 25,
  },
});


export default ForgotPassword;