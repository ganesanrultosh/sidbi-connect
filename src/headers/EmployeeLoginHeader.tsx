import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';

const EmployeeLoginHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={[styles.positionCenter, {width: 50}]}>
        <FontAwesome6 thin name={'arrow-left'} size={25} color={'#ffff'} />
      </TouchableOpacity>

      <View style={[styles.textWrapper]}>
        <Text style={styles.text}>Employee Login</Text>
      </View>

      <View style={[styles.positionCenter, {width: 50}]}>
        <FontAwesome6 thin name={'user-circle'} size={25} color={'#ffff'} />
      </View>
    </View>
  );
};

export default EmployeeLoginHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    backgroundColor: '#2A4B86',
  },
  positionCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
});
