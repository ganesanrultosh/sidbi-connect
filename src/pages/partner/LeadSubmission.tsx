import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {Button, useTheme} from 'react-native-paper';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import CustomDropDown from '../../components/CustomDropDown';
import CustomRadioGroup from '../../components/CustomRadioGroup';
import CustomSwitch from '../../components/CustomSwitch';
import {
  LeadSubmissionProps,
  LeadSubmissionRouteProps,
} from '../navigation/NavigationProps';
import {useAddLeadMutation} from '../../slices/leadSlice';
import {Lead, leadDefaultValue} from '../../models/partner/Lead';
import {useGetMasterQuery} from '../../slices/masterSlice';
import {skipToken} from '@reduxjs/toolkit/query';
import {saveLead} from '../../slices/leadCacheSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {HasLocationPermission} from '../../utils/hasPermissions';
import Toast from 'react-native-root-toast';
import Geolocation from 'react-native-geolocation-service';
import BranchServices from '../../services/branchService';
import useToken from '../../components/Authentication/useToken';
import CustomInput from '../../components/CustomInput';

const LeadSubmission = (props: LeadSubmissionProps) => {
  const navigation = useNavigation();
  const theme = useTheme();
    const styles = StyleSheet.create({
    screenWrapper: {
      flex: 1,
      backgroundColor: '#FCFAFE',
    },
    formContainer: {
      width: '100%',
      height: '100%',
      paddingTop: 50,
      rowGap: 10,
      paddingHorizontal: 20,
    },
    headerText: {
      color: `${theme.colors.onBackground}`,
      fontWeight: '500',
      fontSize: 25,
    },
    questionContainer: {
      borderBlockColor: 'black',
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      backgroundColor: `${theme.colors.background}`,
    },
    actionContainer: {
      height: 120,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: 10,
    },
    button: {
      alignSelf: 'center',
    },
  });

  const dispatch = useAppDispatch();

  const route = useRoute<LeadSubmissionRouteProps>();
  const {lead} = route.params;
  const {leads} = useAppSelector(state => state.persistedLeads);
  const [leadInfo, setLeadInfo] = useState(leadDefaultValue);
  const [addLead, result] = useAddLeadMutation();
  const [branches, setBranches] = useState<any>();
  const [branchesLoadStatus, setBranchesLoadStatus] = useState('uninitialized')

  const [modalVisible, setModalVisible] = useState(false);
  const [termsViewed, setTermsViewed] = useState(false);
  const [concentSent, setConcentSent] = useState(false);
  const [resendConsent, setResendConsent] = useState(false);

  let filledByList = [
    {
      label: 'Facilitator',
      value: 'Partner',
    },
    {
      label: 'Customer',
      value: 'Customer',
    },
  ];

  const initialValues =
    lead?.pan && leads[lead?.pan]
      ? {
          ...leadDefaultValue,
          ...leads[lead?.pan].lead,
        }
      : ({...leadDefaultValue} as Lead);

  const {
    data: master,
    error: masterError,
    isLoading: isMasterLoading,
  } = useGetMasterQuery(initialValues.pincode || skipToken);

  const {getToken} = useToken();

  const getBranches = () => {
    setBranches(undefined)
    setBranchesLoadStatus('loading')
    Geolocation.getCurrentPosition(
      position => {
        if(lead?.pan && leads[lead?.pan].lead?.officeAddress) {
          let officeAddress = leads[lead?.pan].lead?.officeAddress;
          if(officeAddress) {
            BranchServices
              .getLatLng(officeAddress)
              .then(response => response.json())
              .then((response: any) => {
                if(response.results[0] !== undefined) {
                  BranchServices.getBranches(
                    response.results[0].geometry.location.lat, response.results[0].geometry.location.lng
                  ).then(listOfBranch => {
                    let branchesToShow: { label: string; value: string; }[] = [];
                    if(listOfBranch) {
                      listOfBranch.map(value => {
                        branchesToShow.push(
                          {
                            label: value,
                            value
                          }
                        )
                      })
                      setBranches(branchesToShow)
                      setBranchesLoadStatus('success')
                    } else {
                      setBranchesLoadStatus('error')
                    }
                  });
                } else {
                  setBranchesLoadStatus('error')
                }
                
              });
          }
        }
      },
      _error => {
        setBranchesLoadStatus('error')
        Toast.show('Unable to access location');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  useEffect(() => {
    if(Platform.OS === "ios"){
      Geolocation.requestAuthorization('whenInUse').then(res => {
        getBranches()
      })
   } else {
    let locPermission = HasLocationPermission();

    locPermission.then(value => {
      if (value) {
        getBranches()
      } else {
        setBranchesLoadStatus('error')
        Toast.show('Need Location Access');
      }
    });
   }

    
  }, []);

  const submissionValidationSchema = yup.object().shape({
    branchName: yup.string().required('Branch is required.'),
    // dateOfIncorp: yup.string().required('Date of incorporation required'),
    itrFilingLocal: yup
      .boolean()
      .isTrue('Customer should have 3 yrs IT Returns')
      .required('Customer should have 3 yrs IT Returns'),
    bankStatementLocal: yup
      .boolean()
      .isTrue('Customer should have 3 yrs bank statement')
      .required('Customer should have 3 yrs bank statement'),
    gstRegimeLocal: yup
      .boolean()
      .isTrue('Customer should be registered under GST')
      .required('Customer should be registered under GST'),
    applicationFillingBy: yup.string().required('Filled by is required'),
  });

  return (
    <Formik
      validateOnMount={true}
      validationSchema={submissionValidationSchema}
      initialValues={initialValues}
      onSubmit={(values, isValid) => {
        let currentValues = {
          ...leadInfo,
          ...values,
          // dateOfIncorp: Moment(values.dateOfIncorp).format('YYYY-MM-DD'),
          loanType: 'ML',
          customerType: 'new',
        };
        // console.log('Submitting lead', currentValues);
        dispatch(saveLead(currentValues));
        setLeadInfo(currentValues);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'LeadConsent', params: {lead: currentValues}}],
          }),
        );
      }}>
      {({values, handleSubmit, isValid}) => (
        <View style={styles.screenWrapper}>
          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={[styles.headerText, {fontSize: 18}]}>Submission</Text>
            {branchesLoadStatus === 'loading' && (
              <Text style={{paddingBottom: 10}}>Loading branches...</Text>
            )}
            {branchesLoadStatus === 'success' && branches && (
              <Field
                component={CustomDropDown}
                name="branchName"
                label="Branch (*)"
                enableReinitialize
                list={branches}
              />
            )}

            {branchesLoadStatus === 'error' && (
              <>
                <Field
                  component={CustomInput}
                  name="branchName"
                  label="Branch (*)"
                  enableReinitialize
                  disabled={isMasterLoading}
                />
                <Text
                  style={{fontSize: 10, color: 'orange', paddingBottom: 10}}>
                  Unable to load branches
                </Text>
              </>
            )}
            <Field
              component={CustomSwitch}
              name="itrFilingLocal"
              label="Does the customer have Min 3 years of Income tax return filing?"
              enableReinitialize
            />
            <Field
              component={CustomSwitch}
              name="bankStatementLocal"
              label="Does the customer have most recent 12 months (till last month) bank statement?"
            />
            <Field
              component={CustomSwitch}
              name="gstRegimeLocal"
              label="Is the customer registered under GST?"
            />
            <View style={styles.questionContainer}>
              <Field
                component={CustomRadioGroup}
                name="applicationFillingBy"
                header={'Who will be filling the online loan application?'}
                radioList={filledByList}
              />
            </View>
            <View style={styles.actionContainer}>
              {!concentSent && (
                <Button
                  labelStyle={{fontSize: 16}}
                  mode="contained"
                  style={styles.button}
                  disabled={!isValid}
                  onPress={() => handleSubmit()}>
                  Get Customer Consent
                </Button>
              )}
              <Button
                labelStyle={{fontSize: 16}}
                mode="outlined"
                style={styles.button}
                onPress={() => {
                  let currentValues = {
                    ...leadInfo,
                    ...values,
                    // dateOfIncorp: values.dateOfIncorp?.toLocaleString()
                  };
                  dispatch(saveLead(currentValues));
                  setLeadInfo(currentValues);
                  navigation.navigate('Root');
                }}>
                Cancel
              </Button>
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

export default LeadSubmission;
