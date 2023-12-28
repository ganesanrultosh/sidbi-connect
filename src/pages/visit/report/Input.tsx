import {Text, View} from 'react-native';
import Segment from '../../../models/visit/reportStructure/segment';
import React from 'react';
import Field from '../../../models/visit/reportStructure/field';
import CustomTextInput from './CustomTextInput';
import CustomDateInput from './CustomDateInput';
import CustomTextAreaInput from './CustomTextAreaInput';
import CustomRadioInput from './CustomRadioInput';
import CustomMultiSelectInput from './CustomMultiSelectInput';
import CustomGroupInput from './CustomGroupInput';
import Visit from '../../../models/visit/visit';
import VisitFieldUpdateContext from '../../../models/visit/VisitFieldUpdateContext';
import { useTheme } from 'react-native-paper';
import { useAppDispatch } from '../../../app/hooks';
import { saveFieldValue } from '../../../slices/visitCacheSlice';



const Input: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
}> = ({field, visitFieldUpdateContext}) => {
  // type: 'text' | 'date' | 'textarea' | 'radio' | 'groupText' | 'multiselect';
  const theme = useTheme()
  const dispatch = useAppDispatch();

  const onChange = (value: any) => {
    console.log('onChange', {...visitFieldUpdateContext, value: value})
    dispatch(saveFieldValue(
      {...visitFieldUpdateContext, value: value}
    ))
  }

  const getInput = (
    field: Field,
    visitFieldUpdateContext: VisitFieldUpdateContext,
  ) => {
    switch (field.fieldType) {
      case 'text':
        return (
          <CustomTextInput
            field={field}
            visitFieldUpdateContext={visitFieldUpdateContext}
            onChange={onChange}
          />
        );
      case 'date':
        return (
          <CustomDateInput
            field={field}
            visitFieldUpdateContext={visitFieldUpdateContext}
            onChange={onChange}
          />
        );
      case 'textarea':
        return (
          <CustomTextAreaInput
            field={field}
            visitFieldUpdateContext={visitFieldUpdateContext}
            onChange={onChange}
          />
        );
      case 'radio':
        return (
          <CustomRadioInput
            field={field}
            visitFieldUpdateContext={visitFieldUpdateContext}
            onChange={onChange}
          />
        );
      case 'multiselect':
        return (
          <CustomMultiSelectInput
            field={field}
            visitFieldUpdateContext={visitFieldUpdateContext}
            onChange={onChange}
          />
        );
      case 'groupText':
        return (
          <CustomGroupInput
            field={field}
            visitFieldUpdateContext={visitFieldUpdateContext}
            //On change is handled by group input, this is a deviation. Need to be corrected.
          />
        );
      default:
        return <Text style={{color: 'red'}}>Type not found</Text>;
    }
  };

  return (
    <View style={{
      backgroundColor: theme.colors.secondaryContainer, 
      padding: 10, 
      margin: 2}}>
      <Text style={{marginTop: 2}}>{field.fieldTitle}</Text>
      {getInput(field, visitFieldUpdateContext)}
    </View>
  );

  
};

export default Input;
