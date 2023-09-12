import { useNavigation, CommonActions } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native"
import { Button, Surface } from "react-native-paper";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../components/CustomInput";

const Login = () => {
  const navigation = useNavigation();

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .required('Password is required')
      // .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
      // .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
      // .matches(/\d/, "Password must have a number")
      // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
      // .min(8, ({ min }) => `Password must be at least ${min} characters`)
      ,
  })

  return <View style={styles.loginContainer}>
    <Text style={styles.headerText}>SIDBI Connect</Text>
    <Surface elevation={4} style={styles.loginSurface}>
      <Text style={styles.scenarioQuestion}>Already a partner?</Text>
      <Text style={styles.scenarioContent}>Sign in to continue</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={values => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          )
        }}
        >
        {({ 
          handleSubmit, 
          isValid
         }) => (
          <>
            <Field
              component={CustomInput}
              name="email"
              label="Email (*)"
            />
            <Field
              component={CustomInput}
              name="password"
              label="Password (*)"
              secureTextEntry
            />
            <Button
              onPress={(e:any) => handleSubmit(e)}
              mode="contained"
              style={styles.signinButton} 
              disabled={!isValid}
              >
              Sign in
            </Button>
        </>)}
      </Formik>
      <Button
        onPress={() => {
          navigation.navigate(
            "Forgot Password" as never
          );
        }}
        mode="outlined"
        style={styles.passwordButton}
      >
        Forgot password?
      </Button>
    </Surface>
    <Surface elevation={4} style={styles.registrationSurface}>
      <Text style={styles.scenarioQuestion} >Become a partner</Text>
      <Button
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Registration: Basic Information' }],
            })
          );
        }}
        mode='contained'
        style={styles.registerButton}
      >Register</Button>
    </Surface>
  </View>
}

const styles = StyleSheet.create({
  loginContainer: { 
    width: "90%", 
    alignContent: "center", 
    alignItems: "center", 
    alignSelf: "center" 
  },
  headerText: { 
    fontWeight: "bold", 
    fontSize: 20, 
    marginTop: 50, 
    alignSelf: "center" 
  },
  loginSurface: { 
    width: "95%", 
    margin: 50, 
    padding: 20 
  },
  scenarioQuestion: { 
    fontWeight: "bold", 
    margin: 5, 
    alignSelf: "center" 
  },
  scenarioContent: { 
    margin: 5, 
    marginBottom: 15, 
    alignSelf: "center" 
  },
  emailInput: { 
    margin: 3 
  },
  passwordInput: { 
    margin: 3 
  },
  signinButton: { 
    margin: 10 
  },
  passwordButton: { 
    margin: 10 
  },
  registrationSurface: { 
    width: "95%", 
    margin: 0, 
    padding: 20 
  },
  registerButton: { 
    margin: 10 
  }
});

export default Login;