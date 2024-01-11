import React, {useState} from 'react';
import Field from '../../../models/visit/reportStructure/field';
import VisitFieldUpdateContext from '../../../models/visit/VisitFieldUpdateContext';
import TextAreaWithSpeech from '../../../components/speechToText';
import {Modal, TextInput} from 'react-native-paper';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

const CustomTextAreaInput: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
  onChange: (value: any) => void;
}> = ({field, visitFieldUpdateContext, onChange}) => {
  const [value, setValue] = useState(field.fieldValue || '')
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
          value={field.fieldValue || ''}
          onChange={(t: any) => {
              setValue(t)
              onChange(t)
            }
          }
          defaultValue={field.defaultValue || ''}
        />
        {/* <TextInput
          mode="flat"
          underlineColor="transparent"
          style={{
            // marginRight: 20,
            verticalAlign: 'top',
            backgroundColor: '#FFFFFF',
            paddingRight: 10,
          }}
          value={field.fieldValue || ''}
          multiline={true}
          numberOfLines={10}
          placeholder={field.placeholder || ''}
          placeholderTextColor="rgba(129,102,102,0.44)"
          onChangeText={(t) => {
            console.log('text area text change', t)
            onChange(t)
          }}
          defaultValue={field.defaultValue || ''}
          maxFontSizeMultiplier={1}
        /> */}
        <TextInput
          mode="outlined"
          value={value}
          style={{
            // marginRight: 20,
            verticalAlign: 'top',
            backgroundColor: '#FFFFFF',
            paddingRight: 10,
            minHeight: 200,
          }}
          multiline={true}
          numberOfLines={10}
          onChangeText={(text) => {
            setValue(text)
          }}
          onBlur={() => onChange(value)}
          defaultValue={field.defaultValue || ""}
          maxFontSizeMultiplier={1}
        />
      </>
    </View>
  );
};

export default CustomTextAreaInput;
