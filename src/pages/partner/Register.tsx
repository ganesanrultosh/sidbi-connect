import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import {Button, Surface, useTheme} from 'react-native-paper';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import CustomCheckBox from '../../components/CustomCheckBox';
import {
  PartnerRegistrationProps,
  PartnerRegistrationRouteProps,
} from '../navigation/NavigationProps';
import {signupUser} from '../../services/authService';
import encrypt from '../../components/Authentication/passwordUtil';
import {sendOtp} from '../../services/concentService';
import { CountDownTimer } from '../../components/CountDownTimer';

const Register = (props: PartnerRegistrationProps) => {
  const navigation = useNavigation();
  const route = useRoute<PartnerRegistrationRouteProps>();

  const theme = useTheme();

  const styles = StyleSheet.create({
    surface: {width: '90%', margin: 20, padding: 20},
    headerText: {
      color: `${theme.colors.onBackground}`,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    scrollView: {padding: 5},
    registerButton: {
      alignSelf: 'flex-start',
      display: 'flex',
      margin: 10,
    },
    screenWrapper: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    registerLabel: {
      paddingTop: 20,
      height: 50,
      justifyContent: 'center',
    },
    registerText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000',
    },
    infoWrapper: {
      paddingTop: 50,
      paddingHorizontal: 30,
      rowGap: 20,
    },
    titleContainer: {
      height: 30,
      justifyContent: 'center',
    },
    titleText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0, 0.4)',
    },
    modalView: {
      marginHorizontal: 20,
      backgroundColor: '#FBF9FC',
      borderRadius: 12,
      padding: 20,
      alignItems: 'center',
      rowGap: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      textAlign: 'justify',
    },
    button: {
      paddingVertical: 10,
      width: 100,
      borderRadius: 5,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: `${theme.colors.primary}`,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  const {partner} = route.params;
  const [concentSent, setConcentSent] = useState(false);
  const [resendConsent, setResendConsent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [termsViewed, setTermsViewed] = useState(true);

  const registrationValidationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        'Password must have a special character',
      )
      .min(8, ({min}) => `Password must be at least ${min} characters`),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
    otp: yup
      .string()
      .required('OTP is required.')
      .min(4, ({min}) => `OTP should be ${min} characters`)
      .max(4, ({max}) => `OTP should be ${max} characters`),
    termsAccepted: yup
      .boolean()
      .isTrue('Please read and accept the terms and condition'),
  });

  const initialValue = {
    partnerId: undefined,
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
    ...partner,
  };

  const sendConsentOtp = async (values : any) => {
    setResendConsent(false);
    sendOtp({
      mobileNo: values.partnerMobileNo,
      emailId: values.username,
    })
      .then(response => response?.json())
      .then(async (data: any) => {
        Toast.show("OTP sent sucessfully!")
        setTimeout(() => {
          setResendConsent(true);
        }, 180000);
        setConcentSent(true);
      }).catch((error) => {
        Toast.show("Unable to sent OTP, at this time!")
      });
  }

  return (
    <>
      <Formik
        validationSchema={registrationValidationSchema}
        initialValues={initialValue}
        onSubmit={async values => {
          let encryptedPassword = await encrypt(values.password);
          console.log('encryptedPassword', encryptedPassword);
          let partnerToCreate = {
            ...values,
            password: encryptedPassword.password,
            confirmPassword: '',
            saltKey: encryptedPassword.key,
          } as Partner;
          console.log('Partner to create', partnerToCreate);
          await signupUser(partnerToCreate)
            .then(response => response.json())
            .then((data: any) => {
              if (data.error) {
                Toast.show(data.error);
              } else {
                Toast.show('Registration sucessful.', {
                  duration: Toast.durations.LONG,
                });
                navigation.navigate('Login' as never);
              }
            })
            .catch((error: any) => {
              console.log("Error", error);
              Toast.show(error, {duration: Toast.durations.LONG});
            });
          console.log('Register', values);
        }}>
        {({values, handleSubmit, isValid}) => (
          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            keyboardShouldPersistTaps="handled"
            style={[styles.screenWrapper]}>
            <View style={[styles.registerLabel]}>
              <Text style={[styles.registerText]}>Registration</Text>
            </View>
            <View style={[styles.infoWrapper]}>
              <View style={[styles.titleContainer]}>
                <Text style={[styles.titleText]}>Complete Registration</Text>
              </View>
              <View style={[{rowGap: 10}]}>
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
                {termsViewed && (
                  <Field
                    component={CustomCheckBox}
                    name="termsAccepted"
                    disabled={!termsViewed}
                    showModal={setModalVisible}
                    rightText={'I/We accept the Terms and Conditions'}
                  />
                )}
                {/* {!termsViewed && (
                <Button
                  onPress={() => setModalVisible(true)}
                  disabled={!values.password || !values.confirmPassword}>
                  View Terms and Conditions
                </Button>
              )} */}
              </View>
              {values.termsAccepted && (
                <>
                  {values.termsAccepted && (
                    <>
                      {concentSent && (
                        <>
                          <Field
                            component={CustomInput}
                            name="otp"
                            label="OTP (*)"
                          />
                          <Text>
                            OTP is sent to your email and mobile{`\n`}
                            {!resendConsent && (
                              <CountDownTimer
                                initialValue={180}></CountDownTimer>
                            )}
                            {resendConsent && (
                              <>
                                <Text
                                  style={{
                                    marginLeft: 10,
                                    padding: 10,
                                    textDecorationLine: 'underline',
                                    color: 'red',
                                  }}
                                  onPress={() => sendConsentOtp(values)}>
                                  Resend Consent OTP
                                </Text>
                              </>
                            )}
                          </Text>
                        </>
                      )}
                    </>
                  )}

                  {values.termsAccepted && concentSent && (
                    <Button
                      style={styles.registerButton}
                      onPress={(e: any) => handleSubmit(e)}
                      mode="contained">
                      Register
                    </Button>
                  )}
                </>
              )}
              {!concentSent && (
                <Button
                  mode="contained"
                  style={styles.registerButton}
                  onPress={() => sendConsentOtp(values)}>
                  Send OTP
                </Button>
              )}
            </View>
          </ScrollView>
        )}
      </Formik>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              I/We hereby declare and confirm that information submitted by
              me/us on Online Application Portal for the purpose of customer
              lead/application submission is true and accurate to the best of
              my/our knowledge and belief. I/We take full responsibility for the
              accuracy and authenticity of the information provided.{`\n\n`}
              I/we further affirm that the customer is aware of the fact that
              that their information is being provided by me/us and has
              authorised me/us to provide this information on its behalf.
              {`\n\n`}
              I/We also understand that, I/We will not be entitled to receive
              any payment or monetary compensation from SIDBI for submitting
              this customer lead/application to SIDBI through the Portal.
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setTermsViewed(true);
              }}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Register;
