import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, useTheme} from 'react-native-paper';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import {Lead, leadDefaultValue} from '../../models/partner/Lead';
import {saveLead} from '../../slices/leadCacheSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  LeadBasicInfoProps,
  LeadBasicInfoRouteProps,
} from '../navigation/NavigationProps';

const LeadBasicInfo = (props: LeadBasicInfoProps) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const route = useRoute<LeadBasicInfoRouteProps>();
  const {lead} = route.params;
  const {leads} = useAppSelector(state => state.persistedLeads);

  let loanTypeDomain = [
    {
      label: 'Machinery Loan',
      value: 'ML',
    },
    {
      label: 'Project Loan',
      value: 'PL',
    },
  ];

  let customerValueList = [
    {
      label: 'New Customer',
      value: 'new',
    },
    {
      label: 'Existing Customer',
      value: 'existing',
    },
  ];

  const initialValues =
    lead?.pan && leads[lead?.pan]
      ? {
          ...leadDefaultValue,
          ...leads[lead?.pan].lead,
        }
      : {...leadDefaultValue};

  const [leadInfo, setLeadInfo] = useState<Lead>(initialValues);

  const basicInfoValidationSchema = yup.object().shape({
    pan: yup
      .string()
      .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, 'Please enter valid PAN')
      .max(10, "Max 10 character")
      .required('PAN is Required'),
    entityName: yup.string().required('Entity Name is required.'),
    loanAmount: yup
      .number()
      .min(10, ({min}) => `Loan Amount should be atleast ${min} Lakhs (₹)`)
      .max(
        100,
        ({max}) => `Loan Amount should not be more than ${max} Lakhs (₹)`,
      )
      .required('Loan amount is required.'),
  });

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

  return (
    <Formik
      validationSchema={basicInfoValidationSchema}
      initialValues={leadInfo}
      onSubmit={values => {
        let currentValues = {...leadInfo, ...values} as Lead;
        dispatch(saveLead(currentValues));
        setLeadInfo(currentValues);
        navigation.navigate('LeadContactInfo', {lead: currentValues});
      }}>
      {({values, handleSubmit, isValid}) => (
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          keyboardShouldPersistTaps="handled"
          style={[styles.screenWrapper]}>
          <View style={[styles.infoWrapper]}>
            <View style={[styles.titleContainer]}>
              <Text style={[styles.titleText, {fontSize: 18}]}>
                Basic Information
              </Text>
            </View>
            <View style={[{rowGap: 10}]}>
              <Field component={CustomInput} name="pan" label="PAN (*)" />
              <Field
                component={CustomInput}
                name="entityName"
                label="Entity Name (*)"
              />
              <Field
                component={CustomInput}
                name="loanAmount"
                label="Loan Amount (Lakhs ₹) (*)"
              />
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

export default LeadBasicInfo;
