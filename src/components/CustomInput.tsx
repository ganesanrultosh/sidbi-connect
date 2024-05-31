// CustomInput.js
import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';


const CustomInput = (props : any) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name];
  
  const [isValidInput, setIsValidInput] = useState(true);

  return (
    <>
      <TextInput
        mode="outlined"
        style={[styles.textInput, hasError && styles.errorInput]}
        value={value}
        onFocus={() => {
          setFieldTouched(name);
        }}
        onChangeText={text => {
          const pattern = /[<>\/]/;

          if (pattern.test(text)) {
            setIsValidInput(false);
          } else {
            setIsValidInput(true);
            onChange(name)(text);
            props.onChange && props.onChange(text);
          }
        }}
        onBlur={() => {
          setIsValidInput(true);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && isValidInput && (
        <Text style={styles.errorText}>{errors[name]}</Text>
      )}
      {!isValidInput && (
        <Text style={{color: 'red'}}>Invalid text entered</Text>
      )}
     </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    backgroundColor: '#FCFAFE',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 5,
  },
  errorInput: {
    backgroundColor: '#FCFAFE',
  },
});

export default CustomInput;
