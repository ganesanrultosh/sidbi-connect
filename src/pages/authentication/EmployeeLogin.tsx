import {GestureResponderEvent, Image, StyleSheet, Text, View} from 'react-native';
import {Button, Surface, useTheme} from 'react-native-paper';
import CustomInput from '../../components/CustomInput';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import {generateOtp, loginEmployee} from '../../services/authService';
import Toast from 'react-native-root-toast';
import useToken from '../../components/Authentication/useToken';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../app/hooks';
import {useDispatch} from 'react-redux';
import {setMPin} from '../../slices/visitCacheSlice';
import React, {useEffect, useState} from 'react';

const EmployeeLogin = () => {
  const theme = useTheme();
  const {setToken, getToken, setUserType} = useToken();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {mpin} = useAppSelector(state => state.persistedVisists);

  const styles = StyleSheet.create({
    scenarioQuestion: {
      fontWeight: 'bold',
      margin: 5,
      alignSelf: 'center',
    },
    registrationSurface: {
      width: '95%',
      margin: 0,
      padding: 15,
      marginTop: 15,
    },
    registerButton: {
      margin: 10,
    },
    signinButton: {
      margin: 10,
    },
    sidbiImageStyle: {
      marginTop: 10,
      height: 60,
      resizeMode: 'contain',
    },
    loginContainer: {
      paddingTop: 15,
      width: '100%',
      height: '100%',
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: '#F5F7F9',
    },
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getToken().then(data => {
      console.log('Token', data);
      if (data !== undefined && data !== null) setLoggedIn(true);
      else {
        setLoggedIn(false);
        dispatch(setMPin(undefined));
      }
    });
  });

  const employeeMobileNoValidation = yup.object().shape({
    mobileNo: yup
      .string()
      .matches(
        /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
        'Enter a valid mobile number',
      )
      .required('Mobile Number is Required'),
  });

  const employeeOtpValidation = yup.object().shape({
    otp: yup
      .string()
      .required('OTP is required.')
      .min(4, ({min}) => `OTP should be ${min} characters`)
      .max(4, ({max}) => `OTP should be ${max} characters`),
  });

  const mpinValidationSchema = yup.object().shape({
    mpin: yup
      .string()
      .required('MPIN is required.')
      .min(4, ({min}) => `MPIN should be ${min} characters`)
      .max(4, ({max}) => `MPIN should be ${max} characters`),
  });

  return (
    <View style={styles.loginContainer}>
      <Image
        style={styles.sidbiImageStyle}
        source={require('../../images/sidbi.png')}
      />
      <Surface elevation={4} style={styles.registrationSurface}>
        <Text style={styles.scenarioQuestion}>SIDBI Employee </Text>
        {!loggedIn && !otpSent && (
          <Formik
            validationSchema={employeeMobileNoValidation}
            initialValues={{mobileNo: ''}}
            onSubmit={async values => {
              await generateOtp(values.mobileNo)
                .then(response => response.json())
                .then(async (data: any) => {
                  if (data.error) {
                    console.log(data);
                    Toast.show(data.error);
                  } else {
                    Toast.show('OTP Sent sucessfully.');
                    setMobileNo(values.mobileNo);
                    setOtpSent(true);
                  }
                })
                .catch((error: any) => {
                  Toast.show('Error sending OTP. Please try again later.');
                });
            }}>
            {({handleSubmit, isValid}) => (
              <>
                <View>
                  <Field
                    component={CustomInput}
                    name="mobileNo"
                    label="Mobile Number (*)"
                    autoCapitalize="none"
                  />
                  <Button
                    onPress={
                      handleSubmit as never as (
                        e: GestureResponderEvent,
                      ) => void
                    }
                    mode="contained"
                    style={styles.signinButton}
                    disabled={!isValid}>
                    Sign in
                  </Button>
                </View>
              </>
            )}
          </Formik>
        )}
        {!loggedIn && otpSent && (
          <Formik
            validationSchema={employeeOtpValidation}
            initialValues={{otp: ''}}
            onSubmit={async values => {
              await loginEmployee({
                mobileNo: mobileNo,
                otp: values.otp,
              })
                .then(response => response.json())
                .then(async (data: any) => {
                  if (data.error) {
                    console.log(data);
                    Toast.show(data.error);
                  } else {
                    setOtpSent(false);
                    let token = data;
                    token.userType = 'EMPLOYEE';
                    await setToken(token);
                    setLoginSuccess(true);
                  }
                })
                .catch((error: any) => {
                  Toast.show('Login failed. Possible network error!');
                });
            }}>
            {({handleSubmit, isValid}) => (
              <>
                <View>
                  <Field
                    component={CustomInput}
                    name="otp"
                    label="OTP"
                    autoCapitalize="none"
                  />
                  <Button
                    onPress={
                      handleSubmit as never as (
                        e: GestureResponderEvent,
                      ) => void
                    }
                    mode="contained"
                    style={styles.signinButton}
                    disabled={!isValid}>
                    Sign in
                  </Button>
                  <Button
                    onPress={() => setOtpSent(false)}
                    mode="outlined"
                    style={styles.signinButton}
                    disabled={!isValid}>
                    Cancel
                  </Button>
                </View>
              </>
            )}
          </Formik>
        )}
        {!mpin && loggedIn && (
          <Formik
            validationSchema={mpinValidationSchema}
            initialValues={{mpin: ''}}
            onSubmit={async values => {
              Toast.show('MPIN set sucessfully. Please signin using MPIN.');
              dispatch(setMPin(values.mpin));
            }}>
            {({handleSubmit, isValid}) => (
              <>
                <View>
                  <Field
                    component={CustomInput}
                    name="mpin"
                    label="Mobile PIN"
                    secureTextEntry
                    autoCapitalize="none"
                  />
                  <Button
                    onPress={
                      handleSubmit as never as (
                        e: GestureResponderEvent,
                      ) => void
                    }
                    mode="contained"
                    style={styles.signinButton}
                    disabled={!isValid}>
                    Set Mobile PIN
                  </Button>
                </View>
              </>
            )}
          </Formik>
        )}
        {mpin && loggedIn && (
          <Formik
            validationSchema={mpinValidationSchema}
            initialValues={{mpin: ''}}
            onSubmit={async values => {
              if (mpin === values.mpin) {
                setUserType('EMPLOYEE');
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Root'}],
                  }),
                );
              }
            }}>
            {({handleSubmit, isValid}) => (
              <>
                <View>
                  <Field
                    component={CustomInput}
                    name="mpin"
                    label="Mobile PIN"
                    secureTextEntry
                    autoCapitalize="none"
                  />
                  <Button
                    onPress={
                      handleSubmit as never as (
                        e: GestureResponderEvent,
                      ) => void
                    }
                    mode="contained"
                    style={styles.signinButton}
                    disabled={!isValid}>
                    Sign In
                  </Button>
                  <Button
                    onPress={() => {
                      setToken(undefined);
                      dispatch(setMPin(undefined));
                      Toast.show('Login again to set a new MPIN');
                    }}
                    mode="outlined"
                    style={styles.signinButton}
                    disabled={!isValid}>
                    Forgot Mpin
                  </Button>
                </View>
              </>
            )}
          </Formik>
        )}
      </Surface>
    </View>
  );
};

export default EmployeeLogin;
