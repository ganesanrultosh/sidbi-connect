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
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
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
import {Card, Paragraph} from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const screenWidth = Dimensions.get('window').width;

const Login = () => {
  const styles = StyleSheet.create({
  backgroundCover: {
    flex: 1,
    overflow: 'hidden',
  },
  backgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.4)',
  },
  loginScreen: {
    flex: 1,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sidbiImageStyle: {
    width: '90%',
    flex: 2,
    resizeMode: 'contain',
  },

  formWrapper: {
    flex: 3,
  },
  iconsWrapper: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Card: {
    width: '80%',
    backgroundColor: '#fff',
  },
  cardContent: {
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 15,
  },
  loginText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#2F5596',
    letterSpacing: 1,
  },
});


  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../images/login_background.png')}
      resizeMode="cover"
      style={styles.backgroundCover}>
      <SafeAreaView style={styles.backgroundStyle}>
        <View style={styles.loginScreen}>
          <Image
            style={styles.sidbiImageStyle}
            source={require('../../images/sidbi.png')}
          />
          <View style={styles.formWrapper}>
            <View style={styles.iconsWrapper}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EmployeeLogin');
                }}
                style={styles.touchable}>
                <Card style={styles.Card}>
                  <Card.Content style={styles.cardContent}>
                    <FontAwesome6
                      name={'user'}
                      size={50}
                      color="#2F5596"
                      sharpSolid
                    />
                    <Paragraph style={styles.loginText}>Employee</Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PartnerLogin');
                }}
                style={styles.touchable}>
                <Card style={styles.Card}>
                  <Card.Content style={styles.cardContent}>
                    <FontAwesome6
                      name={'handshake'}
                      size={50}
                      color="#2F5596"
                      sharpSolid
                    />
                    <Paragraph style={styles.loginText}>Partner</Paragraph>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;
