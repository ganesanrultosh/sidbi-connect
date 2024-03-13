import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Surface, useTheme} from 'react-native-paper';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import CustomDropDown from '../../components/CustomDropDown';

const RegisterBasicInfo = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = StyleSheet.create({
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
  });

  let categoryMaster = [
    {
      label: 'Entity',
      value: 'Entity',
    },
    {
      label: 'Individual',
      value: 'Individual',
    },
  ];

  let subCategoryMaster = [
    {
      label: 'Original Equipment Manufactures',
      value: 'Original Equipment Manufactures',
    },
    {
      label: 'Chartered Accounts',
      value: 'Chartered Accounts',
    },
    {
      label: 'Consultants',
      value: 'Consultants',
    },
    {
      label: 'Industry Associations',
      value: 'Industry Associations',
    },
    {
      label: 'Retired Bankers',
      value: 'Retired Bankers',
    },
    {
      label: 'Other/Professional Individuals',
      value: 'Other/Professional Individuals',
    },
  ];

  const basicInfoValidationSchema = yup.object().shape({
    pan: yup
      .string()
      .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, 'Please enter valid PAN')
      .required('PAN is Required'),
    name: yup.string().required('Name is required'),
    category: yup.string().required('Category is required'),
    subCategory: yup.string().required('Sub Category is required'),
    keyPerson: yup.string().when('category', (category, schema) => {
      if (String(category) === 'Entity')
        return schema.required('Key person is required');
      return schema;
    }),
  });

  const initialValue = {
    id: undefined,
    pan: '',
    username: '',
    name: '',
    category: '',
    subCategory: '',
    keyPerson: '',
    partnerMobileNo: '',
    pinCode: undefined,
    city: '',
    state: '',
    address: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    saltKey: '',
  };

  return (
    <Formik
      validationSchema={basicInfoValidationSchema}
      initialValues={initialValue}
      onSubmit={values => {
        console.log('On Submit: ', values as Partner);
        navigation.navigate('RegisterContactInfo', {
          partner: values as Partner,
        });
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
              <Text style={[styles.titleText]}>Basic Information</Text>
            </View>
            <View style={[{rowGap: 10}]}>
              <Field component={CustomInput} name="pan" label="PAN (*)" />
              <Field
                component={CustomInput}
                name="name"
                label="Name of Individual/Entity (*)"
              />
              <Field
                component={CustomDropDown}
                name="category"
                label="Category (*)"
                list={categoryMaster}
              />
              <Field
                component={CustomDropDown}
                name="subCategory"
                label="Sub Category (*)"
                list={subCategoryMaster}
              />
              {values.category === 'Entity' && (
                <Field
                  component={CustomInput}
                  name="keyPerson"
                  label="Key Person Name (*)"
                />
              )}
            </View>
            <Button
              labelStyle={{paddingVertical: 2}}
              style={{width: '50%', alignSelf: 'flex-end'}}
              mode="contained"
              disabled={!isValid}
              onPress={(e: any) => handleSubmit(e)}>
              Continue
            </Button>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default RegisterBasicInfo;
