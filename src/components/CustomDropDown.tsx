// CustomInput.js
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import DropDown from 'react-native-paper-dropdown'

const CustomDropDown = (props : any) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched, setFieldValue },
    list: any,
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    if(props.list && value && value !== "") {
      let found = props.list?.map((item : any) => {
        if(item.value === value) return true;
      });
      if(!found) {
        setFieldValue(name, "")
        setFieldTouched(name)
      }
    }
  }, [props.list])

  return (
    props.list && <View style={{marginBottom: 0}}>
      <DropDown
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={value}
        list={props.list}
        setValue={(text) => {
          onChange(name)(text)
        }}
        inputProps={{style: [styles.dropDown, hasError && styles.errorInput]}}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  dropDown: { 
    marginBottom: 10
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    backgroundColor: '#FFCCBB'
  }
})

export default CustomDropDown