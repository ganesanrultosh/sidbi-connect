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
}> = ({visitFieldUpdateContext, field, onChange}) => {
  
  const me = useToken();
  const {getUserName} = useToken();
  const [defaultValue, setDefaultValue] = useState<string | undefined>()
  const {visits} = useAppSelector(state => state.persistedVisists);
  
  useEffect(() => {
    getDefaultValue(field.defaultValue)
  },[])
  
  
  const getDefaultValue = (defaultValue: string | null | undefined) => {
    console.log("getDefaultValue", defaultValue)
    if(defaultValue && defaultValue.indexOf("default:username") >= 0) {
      // profile()
      //   .then(response => response.json())
      //   .then(value => setDefaultValue(value.name));
      getUserName().then(
        (userName => setDefaultValue(userName))
      );
    } else if (defaultValue && defaultValue.indexOf("default:name") >= 0) {
      let visitInState = visits[visitFieldUpdateContext.pan + visitFieldUpdateContext.reportId];
      if (visitInState) {
        setDefaultValue(visitInState.visit.customer.name);
      }
    } 
  }
  
	const [isValidInput, setIsValidInput] = useState(true);
	
  return (
    <>
      <TextInput
        mode="outlined"
        value={field.fieldValue || ''}
        style={{
          marginVertical: 10,
          backgroundColor: '#FFFFFF',
        }}
        onChangeText={text => {
          const pattern = /[<>\/]/;

          if (pattern.test(text)) {
            setIsValidInput(false);
          } else {
            setIsValidInput(true);
            onChange(text);
          }
        }}
        defaultValue={defaultValue || ''}
        maxFontSizeMultiplier={1}
      />
      {!isValidInput && (
        <Text style={{color: 'red'}}>Invalid input entered</Text>
      )}
    </>
  );
};

export default CustomTextInput;
