import { useNavigation, CommonActions } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native"
import { Button, Surface } from "react-native-paper";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../components/CustomInput";
import { loginUser } from "../services/authService";
import useToken from "../components/Authentication/useToken";
import Toast from "react-native-root-toast";

const Login = () => {
  const navigation = useNavigation();
  const {setToken} = useToken();

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .required('Password is required')
  })

  return <View style={styles.loginContainer}>
    <Text style={styles.headerText}>SIDBI Connect</Text>
    <Surface elevation={4} style={styles.loginSurface}>
      <Text style={styles.scenarioQuestion}>Already a partner?</Text>
      <Text style={styles.scenarioContent}>Sign in to continue</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          
          await loginUser({
            username: values.email,
            password: values.password
          })
          .then((response) => response.json())
          .then(async (data : any) => {
            if(data.error) {
              Toast.show(data.error);
            } else {
              let token = data;
              await setToken(token)
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Root' }],
                })
              )
            }
          }).catch((error : any) => {
              console.log(error)
              Toast.show("Login failed. Possible network error!");
            }
          );

          
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
          navigation.navigate('Registration: Basic Information' as never);
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