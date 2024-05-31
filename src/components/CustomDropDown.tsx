// CustomInput.js
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import DropDown from 'react-native-paper-dropdown';

const CustomDropDown = (props: any) => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched, setFieldValue},
    list: any,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    if (props.list && value && value !== '') {
      let found = props.list?.find((item: any) => {
        if (item.value === value) return true;
      });
      if (!found) {
        setFieldValue(name, '');
        setFieldTouched(name, true);
      }
    }
  }, [props.list]);

  // console.log('list', props.list);

  return props.list ? (
    <View style={styles.dropDownWrapper}>
      <DropDown
        mode={'outlined'}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={value}
        list={props.list}
        setValue={text => {
          onChange(name)(text);
        }}
        dropDownItemStyle={styles.dropDownItemStyle}
        inputProps={{style: [styles.dropDown, hasError && styles.errorInput]}}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  dropDownWrapper: {
    width: '100%',
    backgroundColor: '#FCFAFE',
  },
  dropDown: {
    backgroundColor: '#FCFAFE',
  },
  dropDownItemStyle: {
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

export default CustomDropDown;
