// CustomInput.js
import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { RadioButton, TextInput, useTheme } from 'react-native-paper'


const CustomRadioGroup = (props: any) => {

  const theme = useTheme();

  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <>
        <RadioButton.Group onValueChange={value => onChange(name)(value)} value={value}>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{inputProps.header}</Text>
          {
            inputProps.radioList.map((item: any) => {
              return <View key={`v1-${item.label}`} style={{ flexDirection: 'row', alignContent: 'center' }}>
                <View key={`v2-${item.label}`} style={{ flex: 1, alignSelf: 'center' }}>
                  <Text>{item.label}</Text>
                </View>
                <View key={`v3-${item.label}`} style={{ flex: 1, alignItems: "center" }}>
                  <RadioButton.Android value={item.value} />
                </View>
              </View>
            })
          }
        </RadioButton.Group>
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

export default CustomRadioGroup