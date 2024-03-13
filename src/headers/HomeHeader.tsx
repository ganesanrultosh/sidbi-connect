import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const HomeHeader = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
        style={[styles.positionCenter, {width: 50}]}>
        <FontAwesome6 thin name={'bars'} size={25} color={'#ffff'} />
      </TouchableOpacity>

      <View style={[styles.textWrapper, {flexDirection: 'row', columnGap: 10}]}>
        <Image
          style={styles.logoImage}
          source={require('../images/sidbiLogo.png')}
        />
        <Text style={styles.text}>SIDBI Connect</Text>
      </View>

      <View style={[styles.positionCenter, {width: 50}]}>
        <FontAwesome6 thin name={'user-circle'} size={25} color={'#ffff'} />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    paddingVertical: 15,
    backgroundColor: '#2A4B86',
  },
  positionCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
});
