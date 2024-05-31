import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  GestureResponderEvent,
  ScrollView,
} from 'react-native';
import {Button, Card, TextInput, useTheme} from 'react-native-paper';
import * as Yup from 'yup';
import {useFilterCustomersQuery} from '../../slices/customerSlice';
import {skipToken} from '@reduxjs/toolkit/query';
import decrypt from '../../utils/decrypt';
import encrypt from '../../utils/encrypt';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Customer from '../../models/visit/customer';

const SiteVisitCustomerSearch = () => {
  const navigation = useNavigation();
  const [showCreate, setShowCreate] = useState(false);
  const [panOrName, setPanOrName] = useState<string>('');
  const [customersList, setCustomersList] = useState<Customer[] | undefined>();
  const [panOrNameForSearch, setPanOrNameForSearch] = useState<string>('');

  const {
    data: customers,
    isLoading: isCustomerLoading,
    isSuccess: isCustomerSuccess,
    isError: isCustomerError,
  } = useFilterCustomersQuery(panOrNameForSearch || skipToken);

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

  useEffect(() => {
    // mount every panOrName change
    let mounted = true;

    if (mounted) {
      if (panOrNameForSearch !== '' && panOrName !== '') {
        setCustomersList(customers);
      } else if (panOrNameForSearch !== '' && panOrName === '') {
        setCustomersList(undefined);
      } else {
        setCustomersList(undefined);
      }
    }

    return () => {
      mounted = false;
    };
  }, [panOrNameForSearch, customers, panOrName]);

  const createCustomers = () => {
    if (panOrNameForSearch !== '') {
      if (panOrName !== '') {
        if (isCustomerError || !(customersList && customersList.length > 0)) {
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
      paddingHorizontal: 20,
    },
    searchContainer: {
      flex: 1,
      width: '100%',
      marginTop: 50,
    },
    headerText: {
      color: `${theme.colors.onBackground}`,
      fontSize: 18,
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
      backgroundColor: '#fff',
      borderRadius: 10,
      borderWidth: 0.2,
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
    cardActions: {
      paddingHorizontal: 16,
    },
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
                contentStyle={{paddingLeft: 10, fontSize: 16}}
                outlineStyle={{
                  borderRadius: 10,
                }}
                mode="outlined"
                placeholder="Search Name or PAN"
                value={panOrName}
                onChangeText={value => {
                  setPanOrName(value);
                }}
                right={
                  <TextInput.Icon
                    icon={() => (
                      <FontAwesome6
                        name={'magnifying-glass'}
                        size={20}
                        color={'#2F5596'}
                      />
                    )} // where <Icon /> is any component from vector-icons or anything else
                  />
                }
              />
              {/* Not needed if Dynamic search implemented */}
              <Button
                labelStyle={{fontSize: 14}}
                mode="contained"
                onPress={() => {
                  console.log("Setting pan", panOrName)
                  setPanOrNameForSearch(panOrName);
                }}>
                Search
              </Button>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={true}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContainer}>
              {customersList?.map(item => {
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
                  outlineStyle={{borderRadius: 10}}
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
                  outlineStyle={{borderRadius: 10}}
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
