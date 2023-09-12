// CustomInput.js
import React, { useState } from 'react'
import { Text, TextInput, StyleSheet, View } from 'react-native'
import DropDown from 'react-native-paper-dropdown'

const CustomDropDown = (props : any) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    list: any,
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <View style={{marginBottom: 10}}>
      <DropDown
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={value}
        list={props.list}
        setValue={(text) => onChange(name)(text)}
        inputProps={{style: [styles.dropDown, hasError && styles.errorInput]}}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  dropDown: { },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    backgroundColor: '#FFCCBB'
  }
})

export default CustomDropDown