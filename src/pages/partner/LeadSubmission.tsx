import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {Button, Surface, useTheme} from 'react-native-paper';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import CustomDropDown from '../../components/CustomDropDown';
import CustomRadioGroup from '../../components/CustomRadioGroup';
import CustomerDataPicker from '../../components/CustomerDataPicker';
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
import Moment from 'moment';
import {HasLocationPermission} from '../../utils/hasPermissions';
import Toast from 'react-native-root-toast';
import Geolocation from 'react-native-geolocation-service';
import BranchServices from '../../services/branchService';
import useToken from '../../components/Authentication/useToken';
import CustomTextInput from '../visit/report/CustomTextInput';
import CustomInput from '../../components/CustomInput';

const LeadSubmission = (props: LeadSubmissionProps) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = StyleSheet.create({
    surface: {width: '93%', margin: 15, padding: 20},
    registerButton: {alignSelf: 'flex-start', display: 'flex', margin: 10},
    header: {
      color: `${theme.colors.onBackground}`,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    actionContainer: {flexDirection: 'row', alignContent: 'center'},
    buttonContainer: {flex: 2, alignSelf: 'flex-start'},
    button: {
      alignSelf: 'flex-start',
      display: 'flex',
      marginTop: 10,
    },
    buttonTermsAccept: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: `${theme.colors.primary}`,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
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

  useEffect(() => {
    
    let locPermission = HasLocationPermission();

    locPermission.then(value => {
      if (value) {
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
      } else {
        Toast.show('Need Location Access');
      }
    });
  }, []);

  const submissionValidationSchema = yup.object().shape({
    branchName: yup.string().required('Branch is required.'),
    // dateOfIncorp: yup.string().required('Date of incorporation required'),
    itrFilingLocal: yup
      .boolean()
      .isTrue('Customer should have 3 yrs IT Returns'),
    bankStatementLocal: yup
      .boolean()
      .isTrue('Customer should have 3 yrs bank statement'),
    gstRegimeLocal: yup
      .boolean()
      .isTrue('Customer should be registered under GST'),
    applicationFillingBy: yup.string().required('Filled by is required'),
  });

  return (
    <ScrollView>
      <Formik
        validationSchema={submissionValidationSchema}
        initialValues={initialValues}
        onSubmit={(values, isValid) => {
          let currentValues = {
            ...leadInfo,
            ...values,
            // dateOfIncorp: Moment(values.dateOfIncorp).format('YYYY-MM-DD'),
          };
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
          <Surface elevation={4} style={styles.surface}>
            <ScrollView>
              <Text style={styles.header}>Submission</Text>
              {branchesLoadStatus === "loading" && 
              <Text style={{paddingBottom: 10}}>Loading branches...</Text>
              }
              {branchesLoadStatus === "success" && branches && <Field
                component={CustomDropDown}
                name="branchName"
                label="Branch (*)"
                enableReinitialize
                list={branches}
              />}

              {branchesLoadStatus === "error" && 
              <>
              <Field
                component={CustomInput}
                name="branchName"
                label="Branch (*)"
                enableReinitialize
                disabled={isMasterLoading}
              />
              <Text style={{fontSize: 10, color: 'orange', paddingBottom: 10}}>Unable to load branches</Text>
              </>}
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
              </View>
              <View style={styles.actionContainer}>
                {!concentSent && (
                  <Button
                    mode="contained"
                    style={styles.registerButton}
                    disabled={!isValid}
                    onPress={() => handleSubmit()}>
                    Get Customer Consent
                  </Button>
                )}
                <View style={styles.buttonContainer}>
                  <Button
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
              </View>
            </ScrollView>
          </Surface>
        )}
      </Formik>
    </ScrollView>
  );
};

export default LeadSubmission;
