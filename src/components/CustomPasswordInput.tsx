// CustomInput.js
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const CustomPasswordInput = (props: any) => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      // console.log('comp mounted');
    }

    return () => {
      // console.log('comp unmounted');
      mounted = false;
    };
  }, []);

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
          onChange(name)(text);
          props.onChange && props.onChange(text);
        }}
        onBlur={() => {
          onBlur(name);
        }}
        secureTextEntry={!showPassword}
        {...inputProps}
        right={
          <TextInput.Icon
            icon={() => (
              <FontAwesome6
                name={showPassword ? 'eye-slash' : 'eye'}
                size={24}
                color={'#2F5596'}
              />
            )} // where <Icon /> is any component from vector-icons or anything else
            onPress={() => {
              toggleShowPassword();
            }}
          />
        }
      />

      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
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

export default CustomPasswordInput;
