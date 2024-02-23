import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  GestureResponderEvent,
  ScrollView,
} from 'react-native';
import {Button, Surface,Card, TextInput, useTheme} from 'react-native-paper';
import {tr} from 'react-native-paper-dates';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import * as Yup from 'yup';
import { useFilterCustomersQuery } from '../../slices/customerSlice';
import { skipToken } from '@reduxjs/toolkit/query';
import decrypt from '../../utils/decrypt';
import encrypt from '../../utils/encrypt';

// const customers = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     pan: 'ALQPG9479C',
//     customerName: 'First Customer',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     pan: 'ALQPG9479C',
//     customerName: 'Second Customer',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     pan: 'ALQPG9479C',
//     customerName: 'Third Customer',
//   },
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     pan: 'ALQPG9479C',
//     customerName: 'First Customer',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     pan: 'ALQPG9479C',
//     customerName: 'Second Customer',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     pan: 'ALQPG9479C',
//     customerName: 'Third Customer',
//   },
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     pan: 'ALQPG9479C',
//     customerName: 'First Customer',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     pan: 'ALQPG9479C',
//     customerName: 'Second Customer',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     pan: 'ALQPG9479C',
//     customerName: 'Third Customer',
//   },
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     pan: 'ALQPG9479C',
//     customerName: 'First Customer',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     pan: 'ALQPG9479C',
//     customerName: 'Second Customer',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     pan: 'ALQPG9479C',
//     customerName: 'Third Customer',
//   },
// ];

const SiteVisitCustomerSearch = () => {
  const navigation = useNavigation();
  const [showCreate, setShowCreate] = useState(false);
  const [panOrName, setPanOrName] = useState<string>('');
  const [panOrNameForSearch, setPanOrNameForSearch] = useState<string>('');

  const {
    data: customers,
    isLoading: isCustomerLoading,
    isSuccess: isCustomerSuccess,
    isError: isCustomerError,
  } = useFilterCustomersQuery(panOrNameForSearch || skipToken)

  const theme = useTheme();

  const CompanySchema = Yup.object().shape({
    name: Yup.string().required('Company Name is required'),
    pan: Yup.string()
      .trim()
      .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, 'Please enter a valid PAN')
      .required('PAN is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      pan: '',
    },
    validationSchema: CompanySchema,
    onSubmit: values => {
      console.log(values);
      setShowCreate(false);
      formik.setFieldValue('pan', '');
      formik.setFieldValue('name', '');
      formik.setFieldTouched('pan', false);
      formik.setFieldTouched('name', false);
      navigation.navigate('VisitTypeSelection', {
        customer: {
          id: undefined,
          pan: encrypt(values.pan),
          name: values.name,
        },
      });
    },
  });

  const createCustomers = () => {
    if (panOrNameForSearch !== '') {
      if (panOrName !== '') {
        if (isCustomerError || !(customers && customers.length > 0)) {
          return (
            <>
              <Text style={{color: 'red', fontSize: 16}}>
                No customers record found.
              </Text>
              <Button
                mode="contained"
                style={{marginBottom: 10}}
                onPress={() => {
                  setShowCreate(true);
                }}>
                Create customer
              </Button>
            </>
          );
        }
      }
    } else {
      return <></>;
    }
  };

  const styles = StyleSheet.create({
    screenWrapper: {
      flex: 1,
      backgroundColor: '#FCFAFE',
    },
    searchContainer: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    headerText: {
      color: `${theme.colors.onBackground}`,
      fontWeight: '500',
      fontSize: 25,
      textAlign: 'center',
    },
    inputWrapper: {
      flexDirection: 'column',
      rowGap: 10,
    },
    scrollView: {
      flex: 1,
      marginVertical: 15,
    },
    scrollContainer: {
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 10,
      rowGap: 10,
    },

    customerCard: {
      flexDirection: 'column',
      rowGap: 5,
      padding: 10,
      width: '100%',
      borderRadius: 10,
      backgroundColor: '#f4f4f5',
      shadowColor: '#E2DFD2',
      justifyContent: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 20,
      backgroundColor: 'rgba(0,0,0, 0.4)',
    },
    card: {
      width: '100%',
      borderRadius: 5,
      backgroundColor: '#e5e5e5',
    },
    cartTitle: {
      fontSize: 18,
      color: '#1f2937',
      fontStyle: 'italic',
      alignSelf: 'center',
    },

    cardContent: {
      rowGap: 5,
      paddingBottom: 10,
    },
    cardActions: {},
    error: {
      color: 'red',
      fontSize: 14,
    },
  });

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.searchContainer}>
        <Text style={[styles.headerText, {marginBottom: 10}]}>
          Search Customer
        </Text>
        {isCustomerLoading && (
          <Text style={{marginBottom: 10}}>Searching... </Text>
        )}
        {!isCustomerLoading && (
          <>
            <View style={styles.inputWrapper}>
              <TextInput
                mode="outlined"
                placeholder="Search Name or PAN"
                value={panOrName}
                onChangeText={value => {
                  setPanOrName(value);
                }}
              />
              <Button
                labelStyle={{fontSize: 16}}
                mode="contained"
                onPress={() => {
                  setPanOrNameForSearch(panOrName);
                }}>
                Search
              </Button>
            </View>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContainer}>
              {customers?.map(item => {
                return (
                  <TouchableOpacity
                    style={{width: '100%'}}
                    key={item.id}
                    onPress={() => {
                      navigation.navigate('VisitTypeSelection', {
                        customer: {
                          id: item.id,
                          pan: item.pan,
                          name: item.name,
                        },
                      });
                    }}>
                    <View style={styles.customerCard} key={`v1-${item}`}>
                      <Text
                        maxFontSizeMultiplier={1}
                        numberOfLines={2}
                        style={{
                          fontWeight: '500',
                          color: '#000',
                          fontSize: 18,
                        }}>
                        {item.name}
                      </Text>
                      <Text style={{fontSize: 16}}>{decrypt(item.pan)}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
              {createCustomers()}
            </ScrollView>
          </>
        )}
      </View>
      {
        <Modal visible={showCreate} animationType="slide" transparent={true}>
          <View style={styles.centeredView}>
            <Card style={styles.card}>
              <Card.Title
                title="Customer Details to Create"
                titleStyle={styles.cartTitle}></Card.Title>
              <Card.Content style={styles.cardContent}>
                <TextInput
                  mode="outlined"
                  placeholder="Name"
                  style={{width: '100%'}}
                  value={formik.values.name}
                  onChangeText={v => {
                    formik.setFieldValue('name', v);
                  }}
                  defaultValue=""
                  onBlur={() => {
                    formik.setFieldTouched('name', true);
                  }}
                />
                {formik.errors.name && formik.touched.name && (
                  <Text maxFontSizeMultiplier={1} style={styles.error}>
                    {formik.errors.name}
                  </Text>
                )}
                <TextInput
                  mode="outlined"
                  placeholder="PAN"
                  value={formik.values.pan}
                  onChangeText={v => {
                    formik.setFieldValue('pan', v);
                  }}
                  defaultValue=""
                  onBlur={() => {
                    formik.setFieldTouched('pan', true);
                  }}
                  style={{width: '100%'}}
                />
                {formik.errors.pan && formik.touched.pan && (
                  <Text maxFontSizeMultiplier={1} style={styles.error}>
                    {formik.errors.pan}
                  </Text>
                )}
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button
                  style={{padding: 2}}
                  labelStyle={{fontSize: 16}}
                  mode="contained"
                  onPress={
                    formik.handleSubmit as unknown as (
                      e: GestureResponderEvent,
                    ) => void
                  }>
                  Create
                </Button>
                <Button
                  style={{padding: 2}}
                  labelStyle={{fontSize: 16}}
                  mode="outlined"
                  onPress={() => {
                    setShowCreate(false);
                  }}>
                  Close
                </Button>
              </Card.Actions>
            </Card>
          </View>
        </Modal>
      }
    </View>
  );
};

export default SiteVisitCustomerSearch;
