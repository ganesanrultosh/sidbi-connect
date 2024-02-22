// CustomInput.js
import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'


const CustomInput = (props : any) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <>
      <TextInput
        mode="outlined"
        style={[
          styles.textInput,
          hasError && styles.errorInput
        ]}
        value={value}
        onChangeText={
          (text) => {
            onChange(name)(text)
            props.onChange && props.onChange(text)
          }
        }
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    backgroundColor: '#FCFAFE',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  errorInput: {
    backgroundColor: '#FCFAFE',
  },
});

export default CustomInput