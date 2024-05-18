import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button, useTheme} from 'react-native-paper';
import {Field, Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../../components/CustomInput';
import {
  LeadConsentProps,
  LeadConsentRouteProps,
} from '../navigation/NavigationProps';
import {useAddLeadMutation} from '../../slices/leadSlice';
import {Lead, leadDefaultValue} from '../../models/partner/Lead';
import Toast from 'react-native-root-toast';
import {useGetMasterQuery} from '../../slices/masterSlice';
import {skipToken} from '@reduxjs/toolkit/query';
import {sendConsent} from '../../services/concentService';
import {deleteLead, saveLead} from '../../slices/leadCacheSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {me} from '../../services/authService';
import {CountDownTimer} from '../../components/CountDownTimer';

const LeadConcent = (props: LeadConsentProps) => {
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
      alignItems: 'center',
      rowGap: 10,
      paddingHorizontal: 20,
    },
    headerText: {
      color: `${theme.colors.onBackground}`,
      fontWeight: '500',
      fontSize: 25,
      textAlign: 'center',
    },
    header: {
      color: `${theme.colors.onBackground}`,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    actionContainer: {
      width: '100%',
      paddingVertical: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      columnGap: 10,
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

  const route = useRoute<LeadConsentRouteProps>();
  const {lead} = route.params;
  const {leads} = useAppSelector(state => state.persistedLeads);
  const [leadInfo, setLeadInfo] = useState(leadDefaultValue);
  const [addLead, result] = useAddLeadMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [termsViewed, setTermsViewed] = useState(false);
  const [concentSent, setConcentSent] = useState(false);
  const [resendConsent, setResendConsent] = useState(false);

  const initialValues =
    lead?.pan && leads[lead?.pan]
      ? {
          ...leadDefaultValue,
          ...leads[lead?.pan].lead,
        }
      : ({...leadDefaultValue} as Lead);

  const sendConsentOtp = async (values: any) => {
    setResendConsent(false);
    me()
      .then(response => response.json())
      .then((partner: Partner) => {
        console.log('partner', partner);
        if (partner.id) {
          console.log('Concent', {
            partnerId: partner.id,
            entityName: lead?.entityName,
            pan: lead?.pan,
            loanAmount: lead?.loanAmount,
            emailId: lead?.emailId,
            mobileNo: lead?.mobileNo,
          });
          sendConsent({
            partnerId: partner.id,
            entityName: lead?.entityName,
            pan: lead?.pan,
            loanAmount: lead?.loanAmount,
            emailId: lead?.emailId,
            mobileNo: lead?.mobileNo,
          })
            .then(response => response?.json())
            .then(async (data: any) => {
              Toast.show('Consent sent sucessfully!');
              setTimeout(() => {
                setResendConsent(true);
              }, 180000);
              setConcentSent(true);
            })
            .catch(error => {
              Toast.show('Unable to sent consent!');
            });
        }
      })
      .catch((error: any) => {
        console.log('error at me() api', error);
      });
  };

  const {
    data: master,
    error: masterError,
    isLoading: isMasterLoading,
  } = useGetMasterQuery(initialValues.pincode || skipToken);

  const saveLeadToStore = (values: Lead) => {
    me()
      .then(response => response.json())
      .then((partner: Partner) => {
        if (partner.id) {
          let lead = {
            ...leadInfo,
            ...values,
            parentId: partner.id ? partner.id : 0,
          };
          console.log('Saving', lead);
          setLeadInfo(lead);
          dispatch(saveLead(lead));
        }
      })
      .catch((error: any) => {
        console.log('error at me() api in saveLeadToStore', error);
      });
  };

  const submissionValidationSchema = yup.object().shape({
    otp: yup
      .string()
      .required('OTP is required.')
      .min(4, ({min}) => `OTP should be ${min} characters`)
      .max(4, ({max}) => `OTP should be ${max} characters`),
  });

  return (
    <>
      <Formik
        validationSchema={submissionValidationSchema}
        initialValues={initialValues}
        onSubmit={async (values, isValid) => {
          me()
            .then(response => response.json())
            .then(async (partner: Partner) => {
              if (partner.id) {
                console.log('Lead Consent', leadInfo);
                console.log('Lead Consent', values);
                let lead = {
                  ...leadInfo,
                  ...values,
                  parentId: partner.id,
                  bankStatement: values.bankStatementLocal ? 'Y' : 'N',
                  gstRegime: values.gstRegimeLocal ? 'Y' : 'N',
                  itrFiling: values.itrFilingLocal ? 'Y' : 'N',
                  // dateOfIncorp: Moment(values.dateOfIncorp).format('YYYY-MM-DD'),
                };

                //Clean up local variables
                delete lead.bankStatementLocal;
                delete lead.gstRegimeLocal;
                delete lead.itrFilingLocal;

                console.log('lead consent submission', lead);
                if (isValid) {
                  console.log('Lead Submission', lead);
                  await addLead(lead as Lead)
                    .unwrap()
                    .then(() => {
                      Toast.show('Lead submitted sucessfully!');
                      //Remove lead from local store once the lead submission is sucessfull
                      dispatch(deleteLead(initialValues.pan));
                      navigation.navigate('Root' as never);
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
          <View style={styles.screenWrapper}>
            <View style={[styles.formContainer]}>
              <Text style={[styles.headerText, {fontSize: 18}]}>
                Customer Consent
              </Text>
              {
                <>
                  {concentSent && (
                    <>
                      <Field
                        component={CustomInput}
                        name="otp"
                        label="OTP (*)"
                      />
                      <Text style={{fontSize: 18}}>
                        Consent OTP is sent to the customer{`\n`}
                        {!resendConsent && (
                          <CountDownTimer initialValue={180}></CountDownTimer>
                        )}
                        {resendConsent && (
                          <>
                            <Text
                              style={{
                                textDecorationLine: 'underline',
                                color: 'red',
                                fontStyle: 'italic',
                              }}
                              onPress={() => sendConsentOtp(values)}>
                              Resend Consent OTP
                            </Text>
                          </>
                        )}
                      </Text>
                    </>
                  )}
                </>
              }
              <View style={styles.actionContainer}>
                {!concentSent && (
                  <Button
                    labelStyle={{fontSize: 16}}
                    mode="contained"
                    onPress={() => sendConsentOtp(values)}>
                    Send Consent OTP
                  </Button>
                )}
                {/* why saveToLeadStore is marked with '!', Refer last line */}
                {
                  !(
                    <View>
                      <Button
                        mode="contained"
                        onPress={(e: any) => saveLeadToStore(values)}>
                        Save
                      </Button>
                    </View>
                  )
                }
                {concentSent && (
                  <Button
                    labelStyle={{fontSize: 16}}
                    mode="contained"
                    disabled={!isValid}
                    onPress={(e: any) => handleSubmit(e)}>
                    Submit
                  </Button>
                )}
                <Button
                  labelStyle={{fontSize: 16}}
                  mode="outlined"
                  onPress={() => navigation.navigate('Root' as never)}>
                  Cancel
                </Button>
              </View>
            </View>
          </View>
        )}
      </Formik>
      {/* Need for Modal here? */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              eros magna, dictum et dapibus a, porta pretium nibh. Nulla
              facilisi. Nunc aliquet tincidunt dapibus. Suspendisse efficitur
              feugiat mattis. Nullam tempus nisl in libero auctor, in dapibus
              eros ultrices. Curabitur quis ex laoreet, porta eros a, egestas
              ligula. Mauris vitae ultricies elit, quis finibus lorem. Donec
              eget urna accumsan, varius magna tristique, varius tortor. Fusce
              massa tellus, consectetur ut finibus at, pharetra vitae erat.
              Vivamus at magna quis lectus elementum viverra. Donec maximus
              massa sed ex egestas rhoncus sed quis arcu. Integer semper leo ac
              diam varius, quis luctus arcu accumsan. Ut auctor eros eget orci
              facilisis, a varius metus suscipit. Curabitur blandit cursus
              blandit. Vivamus in condimentum risus. Nullam luctus ligula sed
              nunc sollicitudin, ac venenatis nibh posuere. Quisque consequat
              massa est, non mattis augue elementum sed. Cras efficitur, nisl
              quis molestie euismod, nibh libero maximus dolor, at laoreet neque
              arcu in libero. Sed eget vulputate ex, posuere fringilla tellus.
              Suspendisse dignissim lorem a justo volutpat convallis. Phasellus
              blandit viverra semper.
            </Text>
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible);
                setTermsViewed(true);
              }}>
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LeadConcent;
