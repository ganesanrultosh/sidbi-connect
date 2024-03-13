import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button, Surface, useTheme} from 'react-native-paper';
import CustomInput from '../../components/CustomInput';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import {
  generateOtp,
  loginEmployee,
  verifyUser,
} from '../../services/authService';
import Toast from 'react-native-root-toast';
import useToken from '../../components/Authentication/useToken';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../../app/hooks';
import {useDispatch} from 'react-redux';
import {setMPin} from '../../slices/visitCacheSlice';
import React, {useEffect, useState} from 'react';
import CustomPasswordInput from '../../components/CustomPasswordInput';
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

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

const EmployeeLogin = () => {
  const theme = useTheme();
  const {setToken, getToken, setUserType, setUserRole} = useToken();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {mpin} = useAppSelector(state => state.persistedVisists);

  const [otpSent, setOtpSent] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // console.log('employee login comp mounted');

  const [tokenData, setTokenData] = useState();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getToken().then(data => {
        setTokenData(data);
      });
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    getToken().then(data => {
      if (data !== undefined && data !== null) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        dispatch(setMPin(undefined));
      }
    });
  }, [tokenData]);

  const styles = StyleSheet.create({
    screenWrapper: {
      flex: 1,
      backgroundColor: '#fff',
    },
    imageContainer: {
      flex: 1.25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sidbiImageStyle: {
      width: '60%',
      height: '60%',
      resizeMode: 'contain',
      overflow: 'hidden',
    },
    loginsContainer: {
      flex: 3,
    },
    titleContainer: {
      height: 30,
      justifyContent: 'center',
      marginBottom: 30,
    },
    titleText: {
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    loginWrapper: {
      flex: 1,
      paddingHorizontal: 50,
    },
    signinButton: {
      // width: '50%',
      alignSelf: 'center',
      paddingVertical: 2,
      paddingHorizontal: 5,
    },
    cancelButton: {
      alignSelf: 'flex-end',
    },
    cancelText: {
      color: '#2A4B86',
      fontSize: 16,
      textDecorationLine: 'underline',
    },
  });

  return (
    <View style={[styles.screenWrapper]}>
      <View style={[styles.imageContainer]}>
        <Image
          style={styles.sidbiImageStyle}
          source={require('../../images/sidbiConnect.png')}
        />
      </View>
      <View style={[styles.loginsContainer]}>
        <View style={[styles.titleContainer]}>
          <Text style={[styles.titleText]}>SIDBI Employee</Text>
        </View>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          keyboardShouldPersistTaps="handled"
          style={[styles.loginWrapper]}>
          {!loggedIn && !otpSent && (
            <Formik
              validateOnMount={true}
              validationSchema={employeeMobileNoValidation}
              initialValues={{mobileNo: ''}}
              onSubmit={async values => {
                await generateOtp(values.mobileNo)
                  .then(response => response.json())
                  .then(async (data: any) => {
                    if (data.error) {
                      console.log(`error at "generateOtp" api`, data);
                      Toast.show(data.error);
                    } else {
                      // console.log("'OTP sent sucessfully'");
                      Toast.show('OTP Sent sucessfully.');
                      setMobileNo(values.mobileNo);
                      setOtpSent(true);
                    }
                  })
                  .catch((error: any) => {
                    console.log('error sending otp', error);
                    Toast.show('Error sending OTP. Please try again later.');
                  });
              }}>
              {({handleSubmit, isValid}) => {
                return (
                  <>
                    <View style={{rowGap: 20}}>
                      <Field
                        component={CustomInput}
                        name="mobileNo"
                        label="Mobile Number (*)"
                        autoCapitalize="none"
                        keyboardType="number-pad"
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
                    </View>
                  </>
                );
              }}
            </Formik>
          )}
          {!loggedIn && otpSent && (
            <Formik
              validateOnMount={true}
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
                      console.log(
                        `error at "loginEmployee" method`,
                        data.error,
                      );
                      Toast.show(data.error);
                    } else {
                      setOtpSent(false);
                      // console.log(
                      //   `"loginEmployee" method token response data currentUser`,
                      //   data,
                      // );
                      let token = data;
                      token.userType = 'EMPLOYEE';
                      await setToken(token);
                      setTokenData(token);
                      setLoginSuccess(true);
                    }
                  })
                  .catch((error: any) => {
                    Toast.show('Login failed. Possible network error!');
                  });
              }}>
              {({handleSubmit, isValid}) => (
                <>
                  <View style={{rowGap: 20}}>
                    <Field
                      component={CustomInput}
                      name="otp"
                      label="OTP"
                      autoCapitalize="none"
                      keyboardType="number-pad"
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
                    <TouchableOpacity
                      style={[styles.cancelButton]}
                      onPress={() => {
                        setOtpSent(false);
                      }}>
                      <Text style={[styles.cancelText]}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          )}
          {!mpin && loggedIn && (
            <Formik
              validateOnMount={true}
              validationSchema={mpinValidationSchema}
              initialValues={{mpin: ''}}
              onSubmit={async values => {
                Toast.show('MPIN set sucessfully. Please signin using MPIN.');
                dispatch(setMPin(values.mpin));
              }}>
              {({handleSubmit, isValid}) => (
                <>
                  <View style={{rowGap: 20}}>
                    <Field
                      component={CustomPasswordInput}
                      name="mpin"
                      label="Mobile PIN"
                      autoCapitalize="none"
                      keyboardType="number-pad"
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
              validateOnMount={true}
              validationSchema={mpinValidationSchema}
              initialValues={{mpin: ''}}
              onSubmit={async values => {
                if (mpin === values.mpin) {
                  setUserType('EMPLOYEE');
                  // vigneshj
                  await verifyUser()
                    .then(response => response.json())
                    .then(async (data: any) => {
                      if (data.error) {
                        console.log(`error at "verifyUser" method`, data.error);
                        Toast.show(data.error);
                      } else {
                        if (data.role) {
                          setUserRole(data.role);
                        }
                      }
                    })
                    .catch((error: any) => {
                      console.log('error at "verifyUser" method', error);
                    });
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'Root'}],
                    }),
                  );
                } else {
                  Toast.show('Incorrect PIN entered');
                }
              }}>
              {({handleSubmit, isValid}) => (
                <>
                  <View style={{rowGap: 20}}>
                    <Field
                      component={CustomPasswordInput}
                      name="mpin"
                      label="Mobile PIN"
                      autoCapitalize="none"
                      keyboardType="number-pad"
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
                    <TouchableOpacity
                      onPress={() => {
                        setTokenData(undefined);
                        setToken(undefined);
                        dispatch(setMPin(undefined));
                        Toast.show('Login again to set a new MPIN');
                      }}
                      // disabled={!isValid} // validation not needed
                      style={[styles.cancelButton]}>
                      <Text style={[styles.cancelText]}>Forgot Mpin</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default EmployeeLogin;
