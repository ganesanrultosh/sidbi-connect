// CustomInput.js
import moment from 'moment';
import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { RadioButton, TextInput, useTheme } from 'react-native-paper'
import { DatePickerInput } from 'react-native-paper-dates';

const CustomerDataPicker = (props: any) => {

  const theme = useTheme();

  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched, setFieldValue },
    ...inputProps
  } = props

  const [dateValue, setDateValue] = useState(moment(value).toDate() || new Date());

  const hasError = errors[name] && touched[name]

  return (
    <View style={{marginBottom: 10}}>
        <View style={styles.datePicker}>
          <DatePickerInput
            selected={dateValue}
            value={dateValue}
            onChange={(date) => {
              let dateToSet = date ? date : new Date();
              setDateValue(dateToSet);
              setFieldValue(name, dateToSet);
            }}
            inputMode="start"
            mode="outlined"
            {...inputProps}
            style={hasError && styles.errorInput}
          />
        </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  datePicker: { 
    justifyContent: 'center', 
    flex: 1, 
    alignItems: 'center'
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    backgroundColor: '#FFCCBB'
  }
})

export default CustomerDataPicker