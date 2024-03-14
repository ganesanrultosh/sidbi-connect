// CustomInput.js
import React from 'react'
import { Text, StyleSheet, Switch, View } from 'react-native'
import { TextInput } from 'react-native-paper'


const CustomSwitch = (props : any) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched, setFieldValue },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <View style={{marginBottom: 10}}>
      <View style={{ flexDirection: 'row', alignContent: 'center' }}>
        <View style={{ flex: 7, alignSelf: 'flex-start' }}>
          <Text style={{ fontSize: 16 }}>{inputProps.label}</Text>
        </View>
        <View style={{ flex: 3, alignSelf: 'flex-start' }}>
          <Switch 
          	trackColor={{false: '#737373'}}
            style={{ marginBottom: 20 }} 
            value={value} 
            onValueChange={(value) => setFieldValue(name, value)} />
        </View>
      </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
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

export default CustomSwitch