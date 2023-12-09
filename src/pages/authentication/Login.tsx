import {useNavigation, CommonActions} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  GestureResponderEvent,
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

const Login = () => {
  const navigation = useNavigation();
  const {setToken} = useToken();

  const theme = useTheme();
  const [registrationModalVisible, setRegistrationModalVisible] =
    useState(false);
  const [signInModalVisible, setSignInModalVisible] = useState(false);

  const styles = StyleSheet.create({
    loginContainer: {
      paddingTop: 15,
      width: '100%',
      height: '100%',
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: '#F5F7F9',
    },
    headerText: {
      color: `${theme.colors.onBackground}`,
      fontWeight: 'bold',
      fontSize: 20,
      alignSelf: 'center',
      height: 80,
      width: 120,
      padding: 5,
    },
    loginSurface: {
      width: '95%',
      // margin: 30,
      marginTop: 20,
      padding: 20,
    },
    scenarioQuestion: {
      fontWeight: 'bold',
      margin: 5,
      alignSelf: 'center',
    },
    scenarioContent: {
      margin: 5,
      marginBottom: 15,
      alignSelf: 'center',
    },
    emailInput: {
      margin: 3,
    },
    passwordInput: {
      margin: 3,
    },
    signinButton: {
      margin: 10,
    },
    passwordButton: {
      margin: 10,
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
    sidbiImageStyle: {
      marginTop: 10,
      height: 60,
      resizeMode: 'contain',
    },
    button: {
      alignSelf: 'flex-start',
      display: 'flex',
      marginTop: 10,
    },
    buttonTermsAccept: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
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
    modalText: {
      marginBottom: 15,
      textAlign: 'justify',
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
    <ScrollView style={{flex: 1}}>
      <View style={styles.loginContainer}>
        <Image
          style={styles.sidbiImageStyle}
          source={require('../../images/sidbi.png')}
        />

        <Surface elevation={4} style={styles.loginSurface}>
          <Text style={styles.scenarioQuestion}>Facilitator</Text>
          <Text style={styles.scenarioContent}>Sign in to continue</Text>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={async values => {
              await encrypt(values.password).then(
                async (encryptedPassword: {password: string; key: string}) => {
                  console.log(
                    'loginUser getting called',
                    encryptedPassword.password,
                  );
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
              <>
                <Field
                  component={CustomInput}
                  name="email"
                  label="Email (*)"
                  autoCapitalize="none"
                />
                <Field
                  component={CustomInput}
                  name="password"
                  label="Password (*)"
                  secureTextEntry
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
                        the system.{`\n\n`}
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
                        <Text style={styles.textStyle}>Ok</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </>
            )}
          </Formik>
          <Button
            onPress={() => {
              navigation.navigate('ForgotPassword' as never);
            }}
            mode="outlined"
            style={styles.passwordButton}>
            Forgot password?
          </Button>
          <Button
            onPress={() => {
              setRegistrationModalVisible(true);
            }}
            mode="outlined"
            style={styles.registerButton}>
            Register
          </Button>
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
        </Surface>
        <EmployeeLogin />
      </View>
    </ScrollView>
  );
};

export default Login;
