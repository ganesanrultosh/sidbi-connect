import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, Surface, useTheme} from 'react-native-paper';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import CustomDropDown from '../components/CustomDropDown';
import CustomRadioGroup from '../components/CustomRadioGroup';
import CustomerDataPicker from '../components/CustomerDataPicker';
import CustomSwitch from '../components/CustomSwitch';
import CustomInput from '../components/CustomInput';
import CustomCheckBox from '../components/CustomCheckBox';
import {LeadSubmissionProps, LeadSubmissionRouteProps} from './NavigationProps';
import {useAddLeadMutation} from '../slices/leadSlice';
import {Lead, leadDefaultValue} from '../models/Lead';
import Toast from 'react-native-root-toast';
import {useGetMasterQuery} from '../slices/masterSlice';
import {skipToken} from '@reduxjs/toolkit/query';
import {sendConsent} from '../services/concentService';
import {deleteLead, saveLead} from '../slices/leadCacheSlice';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import Moment from 'moment';
import {me} from '../services/authService';

const LeadSubmission = (props: LeadSubmissionProps) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = StyleSheet.create({
    surface: {width: '93%', margin: 15, padding: 20},
    header: {
      color: `${theme.colors.onBackground}`,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    actionContainer: {flexDirection: 'row', alignContent: 'center'},
    buttonContainer: {flex: 2, alignSelf: 'flex-start'},
    button: {alignSelf: 'flex-start', display: 'flex', marginTop: 10},
  });

  const dispatch = useAppDispatch();

  const route = useRoute<LeadSubmissionRouteProps>();
  const {lead} = route.params;
  const {leads} = useAppSelector(state => state.persistedLeads);
  const [leadInfo, setLeadInfo] = useState(leadDefaultValue);

  const [concentSent, setConcentSent] = useState(false);

  const [addLead, result] = useAddLeadMutation();

  const [branches, setBranches] = useState<any>();

  const [resendConsent, setResendConsent] = useState(false);

  let filledByList = [
    {
      label: 'Partner',
      value: 'TPE',
    },
    {
      label: 'Customer',
      value: 'customer',
    },
  ];

  const initialValues =
    lead?.pan && leads[lead?.pan]
      ? {
          ...leadDefaultValue,
          ...leads[lead?.pan].lead,
        }
      : ({...leadDefaultValue} as Lead);

  console.log('Submission', initialValues);

  const {
    data: master,
    error: masterError,
    isLoading: isMasterLoading,
  } = useGetMasterQuery(initialValues.pinCode || skipToken);

  useEffect(() => {
    if (!isMasterLoading && master) {
      let branchList: any = [];
      master.branchCodes?.map(value => {
        branchList.push({
          label: value,
          value,
        });
      });
      if (branchList.length > 0) setBranches(branchList);
    }
  }, [master]);

  const saveLeadToStore = (values: Lead) => {
    me()
      .then(response => response.json())
      .then((partner: Partner) => {
        if (partner.id) {
          let lead = {
            ...leadInfo,
            ...values,
            parentId: partner.id ? partner.id : 0,
            dateOfIncorp: values.dateOfIncorp
              ? Moment(values.dateOfIncorp).format('YYYY-MM-DD HH:MM')
              : undefined,
          };
          console.log('Saving', lead);
          setLeadInfo(lead);
          dispatch(saveLead(lead));
        }
      });
  };

  const submissionValidationSchema = yup.object().shape({
    branchName: yup.string().required('Branch is required.'),
    dateOfIncorp: yup.string().required('Date of incorporation required'),
    itrFiling: yup.boolean().isTrue('Customer should have 3 yrs IT Returns'),
    bankStatement: yup
      .boolean()
      .isTrue('Customer should have 3 yrs bank statement'),
    gstRegime: yup.boolean().isTrue('Customer should be registered under GST'),
    applicationFillingBy: yup.string().required('Filled by is required'),
    otp: yup
      .string()
      .required('OTP is required.')
      .min(4, ({min}) => `OTP should be ${min} characters`)
      .max(4, ({max}) => `OTP should be ${max} characters`),
    termsAgreed: yup.boolean().isTrue('Please read and accept the terms'),
  });

  return (
    <Formik
      validationSchema={submissionValidationSchema}
      initialValues={initialValues}
      onSubmit={async (values, isValid) => {
        me()
          .then(response => response.json())
          .then(async (partner: Partner) => {
            if (partner.id) {
              let lead = {
                ...leadInfo,
                ...values,
                parentId: partner.id,
                bankStatement: values.bankStatement ? 'Y' : 'N',
                gstRegime: values.gstRegime ? 'Y' : 'N',
                itrFiling: values.itrFiling ? 'Y' : 'N',
                dateOfIncorp: Moment(values.dateOfIncorp).format('YYYY-MM-DD'),
              };
              console.log(lead)
              if (isValid) {
                console.log('Lead Submission', lead);
                await addLead(lead as Lead)
                  .unwrap()
                  .then(() => {
                    Toast.show('Lead submitted sucessfully!');
                    dispatch(deleteLead(initialValues.pan));
                    navigation.navigate('Home');
                  })
                  .catch(error => {
                    console.log('Error: ', error, result);
                    if (error.data.error) {
                      Toast.show(error.data.error);
                    } else {
                      Toast.show('Error submitting lead!');
                    }
                  });
              } else {
                console.log('Saving', lead);
                dispatch(saveLead(lead));
              }
            }
          });
      }}>
      {({values, handleSubmit, isValid}) => (
        <Surface elevation={4} style={styles.surface}>
          <ScrollView>
            <Text style={styles.header}>Submission</Text>
            <Field
              component={CustomDropDown}
              name="branchName"
              label="Branch (*)"
              enableReinitialize
              list={branches}
            />
            <Field
              component={CustomerDataPicker}
              name="dateOfIncorp"
              label="Date of incorporation"
              value={
                values.dateOfIncorp
                  ? Moment(values.dateOfIncorp, 'YYYY-MM-DD HH:MM').toDate()
                  : undefined
              }
            />
            <Field
              component={CustomSwitch}
              name="itrFiling"
              label="Does the customer have Min 3 years of Income tax return filing?"
              enableReinitialize
            />
            <Field
              component={CustomSwitch}
              name="bankStatement"
              label="Does the customer have most recent 12 months (till last month) bank statement?"
            />
            <Field
              component={CustomSwitch}
              name="gstRegime"
              label="Is the customer registered under GST?"
            />
            <View
              style={{
                marginTop: 10,
                borderBlockColor: 'black',
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                backgroundColor: `${theme.colors.background}`,
              }}>
              <Field
                component={CustomRadioGroup}
                name="applicationFillingBy"
                header={'Who will be filling the online loan application?'}
                radioList={filledByList}
              />
              {concentSent && (
                <>
                  <Field component={CustomInput} name="otp" label="OTP (*)" />
                  {!resendConsent && (
                    <Text>
                      If you have not got the OTP, You can retry after 3 mins
                    </Text>
                  )}
                </>
              )}
              {(!concentSent || resendConsent) && (
                <Button
                  mode="contained-tonal"
                  style={{width: '50%', alignSelf: 'center', marginTop: 10}}
                  onPress={async () => {
                    setResendConsent(false);
                    sendConsent({mobileNo: initialValues.mobileNo})
                      .then(response => response?.json())
                      .then(async (data: any) => {
                        setTimeout(() => {
                          setResendConsent(true);
                        }, 180000);
                        setConcentSent(true);
                      });
                  }}>
                  {resendConsent ? 'Resend OTP' : 'Get consent'}
                </Button>
              )}
            </View>
            <Field
              component={CustomCheckBox}
              name="termsAgreed"
              rightText={'I/We accept the Terms and Conditions'}
            />
            <View style={styles.actionContainer}>
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={(e: any) => saveLeadToStore(values)}>
                  Save
                </Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  style={styles.button}
                  disabled={!isValid}
                  onPress={(e: any) => handleSubmit(e)}>
                  Submit
                </Button>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  mode="outlined"
                  style={styles.button}
                  onPress={() => navigation.navigate('Home' as never)}>
                  Cancel
                </Button>
              </View>
            </View>
          </ScrollView>
        </Surface>
      )}
    </Formik>
  );
};

export default LeadSubmission;
