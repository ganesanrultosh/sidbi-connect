// CustomInput.js
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import CheckBox from 'react-native-check-box'
import { TextInput } from 'react-native-paper'


const CustomCheckBox = (props : any) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched, setFieldValue },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <>
      <CheckBox
        style={{ flex: 1, padding: 10 }}
        isChecked={value}
        onClick={() => setFieldValue(name, !value)}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    backgroundColor: '#FFCCBB'
  }
})

export default CustomCheckBox;