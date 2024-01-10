import React, {useState} from 'react';
import Field from '../../../models/visit/reportStructure/field';
import VisitFieldUpdateContext from '../../../models/visit/VisitFieldUpdateContext';
import TextAreaWithSpeech from '../../../components/speechToText';
import {Modal, TextInput} from 'react-native-paper';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomTextAreaInput: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
  onChange: (value: any) => void;
}> = ({field, visitFieldUpdateContext, onChange}) => {
  const getValueAsString = (value: any) => {
    if (value)
      return (
        JSON.stringify(value)
          .replaceAll('[', '')
          .replaceAll(']', '')
          .replaceAll('"', '')
      );
    else return value;
  };

  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        flex: 1,
        marginVertical: 5,
        // marginRight: 15,
      }}>
      <>
        <TextAreaWithSpeech
          value={getValueAsString(field.fieldValue) || ''}
          onChange={(t: any) => {
            onChange(t);
          }}
          defaultValue={field.defaultValue || ''}
        />
        <TextInput
          mode="flat"
          underlineColor="transparent"
          style={{
            marginRight: 20,
            verticalAlign: 'top',
            backgroundColor: '#FFFFFF',
            paddingRight: 10,
          }}
          value={getValueAsString(field.fieldValue) || ''}
          multiline={true}
          numberOfLines={10}
          placeholder={field.placeholder || ''}
          placeholderTextColor="rgba(129,102,102,0.44)"
          onChangeText={onChange}
          defaultValue={field.defaultValue || ''}
          maxFontSizeMultiplier={1}
        />
      </>
    </View>
  );
};

export default CustomTextAreaInput;
