import React, {useEffect, useState} from 'react';
import Field from '../../../models/visit/reportStructure/field';
import VisitFieldUpdateContext from '../../../models/visit/VisitFieldUpdateContext';
import TextAreaWithSpeech from '../../../components/speechToText';
import {Modal, TextInput} from 'react-native-paper';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import { profile } from '../../../services/authService';
import { useAppSelector } from '../../../app/hooks';

const CustomTextAreaInput: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
  onChange: (value: any) => void;
}> = ({field, visitFieldUpdateContext, onChange}) => {

  const [value, setValue] = useState<string | null | undefined>(field.fieldValue)
  const [defaultValue, setDefaultValue] = useState<string | undefined>()
  const {visits} = useAppSelector(state => state.persistedVisists);
  
  useEffect(() => {
    getDefaultValue(field.defaultValue)
  },[])
  

  const getDefaultValue = (defaultValue: string | null | undefined) => {
    if(defaultValue && defaultValue.indexOf("default:username") >= 0) {
      profile()
        .then(response => response.json())
        .then(value => setDefaultValue(value.name));      
    } else if (defaultValue && defaultValue.indexOf("default:name") >= 0) {
      let visitInState = visits[visitFieldUpdateContext.pan + visitFieldUpdateContext.reportId];
      if (visitInState) {
        setDefaultValue(visitInState.visit.customer.name)
      }
    } 
  }
  
	const [isValidInput, setIsValidInput] = useState(true);
	
	
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
          defaultValue={defaultValue || ''}
        />
        <TextInput
          mode="outlined"
          value={value || defaultValue || ''}
          style={{
            // marginRight: 20,
            verticalAlign: 'top',
            backgroundColor: '#FFFFFF',
            paddingRight: 10,
            minHeight: 200,
          }}
          multiline={true}
          numberOfLines={10}
          onChangeText={text => {
            const pattern = /[<>\/]/;

            if (pattern.test(text)) {
              setIsValidInput(false);
            } else {
              setIsValidInput(true);
              setValue(text);
            }
          }}
          onBlur={() => {
            setIsValidInput(true);
            onChange(value);
          }}
          defaultValue={defaultValue || ""}
          maxFontSizeMultiplier={1}
        />
      </>
    </View>
  );
};

export default CustomTextAreaInput;
