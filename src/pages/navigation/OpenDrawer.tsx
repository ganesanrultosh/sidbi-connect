import { useNavigation, CommonActions, DrawerActions } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native"
import { Button, Surface } from "react-native-paper";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../../components/CustomInput";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

const OpenDrawer = () => {
  const navigation = useNavigation();
  return (<FontAwesome6 name="bars" size={20} onPress={() => {
    navigation.navigate('Feed' as never)
  }} />)
}

// export default OpenDrawer;