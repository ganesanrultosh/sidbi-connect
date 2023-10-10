import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Surface, useTheme } from "react-native-paper";
import { Field, Formik } from "formik";
import * as yup from 'yup';
import CustomInput from "../components/CustomInput";
import CustomDropDown from "../components/CustomDropDown";

const RegisterBasicInfo = () => {

  const navigation = useNavigation();
  const theme = useTheme();
  const styles = StyleSheet.create({
    basicInfoSurface: { width: "90%", margin: 20, padding: 20 },
    basicInfoTitle: { 
      color: `${theme.colors.onBackground}`,
      fontSize: 20, fontWeight: "bold", marginBottom: 20 },
    continueButton: { 
      alignSelf: "flex-end", 
      display: "flex", 
      margin: 10 
    },
    scrollView: { 
      padding: 5 
    }
  })

  let categoryMaster = [{
    label: 'Entity',
    value: 'Entity',
  }, {
    label: 'Individual',
    value: 'Individual',
  }];

  let subCategoryMaster = [{
    label: 'Original Equipment Manufactures',
    value: 'Original Equipment Manufactures',
  }, {
    label: 'Charted Accounts',
    value: 'Charted Accounts',
  }, {
    label: 'Consultants',
    value: 'Consultants',
  }, {
    label: 'Industry Associations',
    value: 'Industry Associations',
  }, {
    label: 'Retired Bankers',
    value: 'Retired Bankers',
  }, {
    label: 'Other/Professional Individuals',
    value: 'Other/Professional Individuals',
  }];

  const basicInfoValidationSchema = yup.object().shape({
    pan: yup
      .string()
      .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Please enter valid PAN")
      .required('PAN is Required'),
    name: yup
      .string()
      .required('Name is required'),
    category: yup
      .string()
      .required('Category is required'),
    subCategory: yup
      .string()
      .required('Sub Category is required'),
    keyPerson: yup
      .string()
      .when("category", (category, schema) => {
        if(String(category) === "Entity")
          return schema.required("Key person is required")
        return schema
      })
  })

  const initialValue = { 
    pan: '', 
    username: '', 
    name: '',
    category: '', 
    subCategory: '', 
    keyPerson: '',
    mobileNo: '', 
    pinCode: undefined, 
    city: '', 
    state: '',
    address: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  };

  return <Formik
    validationSchema={basicInfoValidationSchema}
    initialValues={initialValue}
    onSubmit={values => {
      console.log("On Submit: ", values as Partner)
      navigation.navigate(
        'RegisterContactInfo', 
        {partner: values as Partner})
    }}
  >
    {({
      values,
      handleSubmit,
      isValid
    }) => (<Surface elevation={4} style={styles.basicInfoSurface}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.basicInfoTitle}>Basic Information</Text>
        <Field
          component={CustomInput}
          name="pan"
          label="PAN (*)"
        />
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
      {
        values.category === "Entity" &&
        <Field
          component={CustomInput}
          name="keyPerson"
          label="Key Person Name (*)"
        />
      }
      </ScrollView>
      <Button
        mode="contained"
        disabled={!isValid}
        style={styles.continueButton}
        onPress={(e:any) => handleSubmit(e)}>
          Continue
      </Button>
    </Surface>)}
  </Formik>
}



export default RegisterBasicInfo;