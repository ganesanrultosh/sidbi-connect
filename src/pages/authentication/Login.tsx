import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {Card, Paragraph, ThemeProvider, useTheme} from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View style={[styles.screenWrapper]}>
      <View style={[styles.imageContainer]}>
        <Image
          style={styles.sidbiImageStyle}
          source={require('../../images/sidbiConnect.png')}
        />
      </View>
      <View style={[styles.loginsContainer]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PartnerLogin');
          }}
          style={[styles.loginWrapper]}>
          <Image
            style={styles.loginImage}
            source={require('../../images/partnerLoginImage.png')}
          />
          <Text style={[styles.loginTitle]}>Partner Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EmployeeLogin');
          }}
          style={[styles.loginWrapper]}>
          <Image
            style={styles.loginImage}
            source={require('../../images/employeeLoginImage.png')}
          />
          <Text style={[styles.loginTitle]}>Employee Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidbiImageStyle: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  loginsContainer: {
    flex: 3,
    rowGap: 15,
    paddingTop: 30,
  },
  loginWrapper: {
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
    paddingHorizontal: screenWidth / 4 - 15,
  },
  loginImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  loginTitle: {
    fontSize: 20,
    color: '#334155',
  },
});

export default Login;
