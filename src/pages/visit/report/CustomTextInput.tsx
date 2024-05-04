import {Text} from 'react-native';

import React, { useEffect, useState } from 'react';
import Field from '../../../models/visit/reportStructure/field';
import { TextInput } from 'react-native-paper';
import Visit from '../../../models/visit/visit';
import VisitFieldUpdateContext from '../../../models/visit/VisitFieldUpdateContext';
import { getDomainData } from '../../../slices/visitCacheSlice';
import useToken from '../../../components/Authentication/useToken';
import { profile } from '../../../services/authService';
import { useAppSelector } from '../../../app/hooks';

const CustomTextInput: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
  onChange: (value:any) => void
}> = ({field, visitFieldUpdateContext, onChange}) => {

  const me = useToken();
  const [defaultValue, setDefaultValue] = useState<string | undefined>()
  const {visits} = useAppSelector(state => state.persistedVisists);
  
  useEffect(() => {
    getDefaultValue(field.defaultValue)
  })
  

  const getDefaultValue = (defaultValue: string | null | undefined) => {
    if(defaultValue && defaultValue.indexOf("default:username") >= 0) {
      profile()
        .then(response => response.json())
        .then(value => setDefaultValue(value.name));      
    } else if (defaultValue && defaultValue.indexOf("default:name") >= 0) {
      let visitInState = visits[visitFieldUpdateContext.pan + visitFieldUpdateContext.reportId];
      if (visitInState) {
        return visitInState.visit.customer.name
      }
    } 
    else return defaultValue;
  }

  return (
    <TextInput
      mode="outlined"
      value={field.fieldValue || undefined}
      style={{
        marginVertical: 10,
      }}
      onChangeText={(text) => {
        onChange(text)
      }}
      defaultValue={defaultValue}
      maxFontSizeMultiplier={1}
    />
  );
};

export default CustomTextInput;
