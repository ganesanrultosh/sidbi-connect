import React, {useState} from 'react';
import Field from '../../../models/visit/reportStructure/field';
import VisitFieldUpdateContext from '../../../models/visit/VisitFieldUpdateContext';
import TextAreaWithSpeech from '../../../components/speechToText';
import {TextInput} from 'react-native-paper';

const CustomTextAreaInput: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
  onChange: (value: any) => void;
}> = ({field, visitFieldUpdateContext, onChange}) => {
  const getValueAsString = (value : any) => {
    if(value) return JSON.stringify(value)
      .replaceAll('[', '')
      .replaceAll(']', '')
      .replaceAll(',', ',\n')
    else return value;
  }

  return (
    <TextInput
      style={{verticalAlign: 'top', backgroundColor: '#FFFFFF', marginTop: 10}}
      value={getValueAsString(field.fieldValue) || ''}
      multiline={true}
      numberOfLines={6}
      placeholder={field.placeholder || ''}
      placeholderTextColor="rgba(129,102,102,0.44)"
      onChangeText={onChange}
      defaultValue={field.defaultValue || ''}
      maxFontSizeMultiplier={1}
    />
  );
};

export default CustomTextAreaInput;
