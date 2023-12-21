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
import PartnerLogin from './PartnerLogin';

const Login = () => {
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
    sidbiImageStyle: {
      marginTop: 10,
      height: 120,
      resizeMode: 'contain',
    },
    signinButton: {
      margin: 10,
      marginTop: 50
    },
  });

  const navigation = useNavigation();

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.loginContainer}>
        <Image
          style={styles.sidbiImageStyle}
          source={require('../../images/sidbi.png')}
        />
        <View style={{marginTop: 100}}>
          <Button
            onPress={() => {
              navigation.navigate("EmployeeLogin")
            }}
            mode="contained"
            style={styles.signinButton}>
            Login as Employee
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("PartnerLogin")
            }}
            mode="contained"
            style={styles.signinButton}>
            Login as Partner
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
