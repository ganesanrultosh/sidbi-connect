import {useNavigation, CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import {Button, Surface, useTheme} from 'react-native-paper';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import {generateOtp, loginUser} from '../../services/authService';
import useToken from '../../components/Authentication/useToken';
import Toast from 'react-native-root-toast';
import encrypt from '../../components/Authentication/passwordUtil';
import EmployeeLogin from './EmployeeLogin';
import {ScrollView} from 'react-native';
import CustomPasswordInput from '../../components/CustomPasswordInput';

const PartnerLogin = () => {
  const navigation = useNavigation();
  const {setToken} = useToken();

  const theme = useTheme();
  const [registrationModalVisible, setRegistrationModalVisible] =
    useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);

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
      rowGap: 20,
    },
    signinButton: {
      width: '50%',
      alignSelf: 'center',
      paddingVertical: 2,
    },
    cancelButton: {
      marginVertical: 12,
      alignSelf: 'flex-end',
    },
    cancelText: {
      color: '#2A4B86',
      fontSize: 16,
      textDecorationLine: 'underline',
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
    buttonTermsAccept: {
      paddingVertical: 10,
      width: 100,
      borderRadius: 5,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: `${theme.colors.primary}`,
    },
  });

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup.string().required('Password is required'),
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
          <Text style={[styles.titleText]}>SIDBI Facilitator</Text>
        </View>
        <View style={[styles.titleContainer, {marginBottom: 15}]}>
          <Text
            style={[
              styles.titleText,
              {color: '#2596be', fontWeight: 'normal'},
            ]}>
            Sign in to Continue
          </Text>
        </View>
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          keyboardShouldPersistTaps="handled"
          style={[styles.loginWrapper]}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={async values => {
              await encrypt(values.password).then(
                async (encryptedPassword: {password: string; key: string}) => {
                  // console.log(
                  //   'loginUser getting called',
                  //   encryptedPassword.password,
                  // );
                  await loginUser({
                    username: values.email,
                    password: encryptedPassword.password,
                    saltkey: encryptedPassword.key,
                  })
                    .then(response => response.json())
                    .then(async (data: any) => {
                      if (data.error) {
                        console.log(data);
                        Toast.show(data.error);
                      } else {
                        let token = data;
                        token.userType = 'TPE';
                        await setToken(token);
                        navigation.dispatch(
                          CommonActions.reset({
                            index: 0,
                            routes: [{name: 'Root'}],
                          }),
                        );
                      }
                    })
                    .catch((error: any) => {
                      console.log('Error', error);
                      Toast.show('Login failed. Possible network error!');
                    });
                },
              );
            }}>
            {({handleSubmit, isValid}) => (
              <View style={{rowGap: 15}}>
                <Field
                  component={CustomInput}
                  name="email"
                  label="Email (*)"
                  autoCapitalize="none"
                />
                <Field
                  component={CustomPasswordInput}
                  name="password"
                  label="Password (*)"
                />
                <Button
                  onPress={(e: any) => setSignInModalVisible(true)}
                  mode="contained"
                  style={styles.signinButton}
                  disabled={!isValid}>
                  Sign in
                </Button>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={signInModalVisible}
                  onRequestClose={() => {
                    setSignInModalVisible(!signInModalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>
                        SIDBI provides EXPRESS machinery loan to MSMEs both in
                        manufacturing & service sector. Under EXPRESS scheme
                        term loan upto Rs. 100 lakh is provided through system
                        driven process and inprinciple decision is conveyed by
                        the system.
                        {`\n\n`}
                        Any consultant, chartered accountant, retired banker,
                        professionals, machinery suppliers & industry
                        association can onboard and register as EXPRESS loan
                        facilitator and start channelizing leads on behalf of
                        their clients/customers for availing EXPRESS machinery
                        loan.
                      </Text>
                      <Pressable
                        style={[styles.buttonTermsAccept, styles.buttonClose]}
                        onPress={(e: any) => {
                          setSignInModalVisible(false);
                          handleSubmit(e);
                        }}>
                        <Text style={styles.textStyle}>OK</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </View>
            )}
          </Formik>
          <TouchableOpacity
            style={[styles.cancelButton]}
            onPress={() => {
              navigation.navigate('ForgotPassword' as never);
            }}>
            <Text style={[styles.cancelText]}>Forget Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cancelButton]}
            onPress={() => {
              setRegistrationModalVisible(true);
            }}>
            <Text style={[styles.cancelText]}>Register</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={registrationModalVisible}
            onRequestClose={() => {
              setRegistrationModalVisible(!registrationModalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  SIDBI provides EXPRESS machinery loan to MSMEs both in
                  manufacturing & service sector. Under EXPRESS scheme term loan
                  upto Rs. 100 lakh is provided through system driven process
                  and inprinciple decision is conveyed by the system.{`\n\n`}
                  Any consultant, chartered accountant, retired banker,
                  professionals, machinery suppliers & industry association can
                  onboard and register as EXPRESS loan facilitator and start
                  channelizing leads on behalf of their clients/customers for
                  availing EXPRESS machinery loan.
                </Text>
                <Pressable
                  style={[styles.buttonTermsAccept, styles.buttonClose]}
                  onPress={(e: any) => {
                    setRegistrationModalVisible(false);
                    navigation.navigate('RegisterBasicInfo' as never);
                  }}>
                  <Text style={styles.textStyle}>Ok</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </View>
  );
};

export default PartnerLogin;
