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
import {Button, Surface, TextInput, useTheme} from 'react-native-paper';
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

  const styles = StyleSheet.create({
    viewStyle: {flex: 1},
    surfaceStyle: {width: '90%', margin: 20, padding: 10},
    headerText: {
      color: `${theme.colors.onBackground}`,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    scrollView: {height: '88%', marginTop: 10},
    continueButton: {alignSelf: 'center', display: 'flex'},
    radioGroupEnclosure: {
      marginTop: 10,
      borderBlockColor: 'black',
      borderWidth: 1,
      padding: 10,
      borderRadius: 3,
    },
    error: {
      fontSize: 14,
      fontFamily: 'Roboto-Regular',
      color: 'red',
      marginTop: 0,
      marginBottom: 10,
    },
    modal: {
      backgroundColor: 'white',
      margin: 0,
      alignItems: 'center',
      justifyContent: 'center',
      height: 200,
    },
  });

  return (
    <View style={styles.viewStyle}>
      <Surface elevation={4} style={styles.surfaceStyle}>
        <Text style={styles.headerText}>
          Search Customer
          Customer Loading: {isCustomerLoading ? 'true' : 'false'}
          Customer isSuccess: {isCustomerSuccess ? 'true' : 'false'}
        </Text>
        {isCustomerLoading && <Text>Searching... </Text>}
        {!isCustomerLoading && <>
        <TextInput
          mode="outlined"
          placeholder="Search Name or PAN"
          value={panOrName}
          onChangeText={value => {
            setPanOrName(value);
          }}
          style={{
            marginBottom: 10,
          }}
        />
        <Button mode="contained" style={{marginBottom: 10}} onPress={() => {
          setPanOrNameForSearch(panOrName)
        }}>
          Search
        </Button>
        <ScrollView style={{height: "70%"}}>
          <View>
            {customers?.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    navigation.navigate('VisitTypeSelection', {
                      customer: {
                        id: undefined,
                        pan: item.pan,
                        name: item.name,
                      },
                    });
                  }}>
                  <Surface elevation={2} style={{margin: 2, padding: 5}}>
                    <View
                      key={`v1-${item}`}
                      style={{flexDirection: 'row', alignContent: 'center'}}>
                      <View
                        key={`v3-${item}`}
                        style={{flex: 0.9, alignItems: 'flex-start'}}>
                        <Text maxFontSizeMultiplier={1} numberOfLines={2} style={{fontWeight: "bold"}}>
                          {item.name}
                        </Text>
                        <Text>{decrypt(item.pan)}</Text>
                      </View>
                      <View
                        key={`v2-${item}`}
                        style={{flex: 0.1, justifyContent: 'center'}}>
                        <FontAwesome6 name="greater-than" size={15} />
                      </View>
                    </View>
                  </Surface>
                </TouchableOpacity>
              );
            })}
            {isCustomerError && !(customers && customers?.length > 0) && <><Text style={{margin: 5, color: 'red'}}>
              No customer record found.
            </Text>
            <Button
              mode="contained"
              style={{marginBottom: 10}}
              onPress={() => {
                setShowCreate(true);
              }}>
              Create customer
            </Button></>}
          </View>
        </ScrollView>
        </>}
        <Modal
          visible={showCreate}
          animationType="slide"
          transparent={true}
          style={styles.modal}>
          <View
            style={{
              marginHorizontal: 20,
              marginTop: 75,
              flex: 1,
            }}>
            <Surface elevation={2} style={{margin: 2, padding: 20}}>
              <Text
                style={{fontSize: 16, paddingVertical: 10, fontWeight: 'bold'}}>
                Enter customer details to create
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Customer Name"
                style={{width: '90%'}}
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
                style={{width: '90%'}}
              />
              {formik.errors.pan && formik.touched.pan && (
                <Text maxFontSizeMultiplier={1} style={styles.error}>
                  {formik.errors.pan}
                </Text>
              )}
              <View
                key={`create-buttons`}
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  margin: 20,
                }}>
                <View
                  key={`create-button-save`}
                  style={{flex: 1, alignItems: 'center'}}>
                  <Button
                    mode="contained"
                    onPress={
                      formik.handleSubmit as unknown as (
                        e: GestureResponderEvent,
                      ) => void
                    }>
                    Create
                  </Button>
                </View>
                <View
                  key={`create-button-close`}
                  style={{flex: 1, alignItems: 'center'}}>
                  <Button
                    mode="outlined"
                    onPress={() => {
                      setShowCreate(false);
                    }}>
                    Close
                  </Button>
                </View>
              </View>
            </Surface>
          </View>
        </Modal>
      </Surface>
    </View>
  );
};

export default SiteVisitCustomerSearch;
