import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import VisitService from '../../services/visitService';
import CustomTextAreaInput from '../../pages/visit/report/CustomTextAreaInput';
import decrypt from '../../utils/decrypt';

const MultiSelectComp = ({field, visitFieldContext, domainValue, onChange}) => {
  onSelectedItemsChange = selectedItems => {
    onChange && onChange(selectedItems);
  };

  const [domainValues, setDomainValues] = useState([]);
  const [status, setStatus] = useState('uninitialized');

  useEffect(() => {
    if ((!domainValues || domainValues.length === 0) && status !== 'error') {
      setStatus('loading');
      let key = decrypt(visitFieldContext.pan);
      // let key = 'ABECS7591N';
      VisitService.getDomainData({domain: domainValue, key})
        .then(res => {
          console.log('Get Domain Data Success', res.data);
          setDomainValues(res.data);
          setStatus('success');
        })
        .catch(error => {
          console.log('Get Domain Data Error', error);
          setStatus('error');
          setDomainValues([]);
        });
    } else {
      setStatus('success');
    }
  }, []);

  const getFieldValuesAsArray = (value) => {
    if(typeof value === 'string') {
      return [value];
    } else {
      return value;
    }
  }

  return (
    <>
        {domainValues && status === 'success' && domainValues.length > 0 && (
          <View style={{backgroundColor: '#EBF9F9', padding: 5, marginVertical: 5}}>
            <MultiSelect
              items={domainValues}
              uniqueKey={`label`}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={getFieldValuesAsArray(field.fieldValue) || []}
              textInputProps={{
                style: {backgroundColor: '#CBF9F9'},
              }}
              selectText="Select ..."
              searchInputPlaceholderText="Search ..."
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CBF9F9"
              tagTextColor="black"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="label"
              searchInputStyle={{color: '#CCC'}}
              submitButtonColor="#rgba(108,78,212,0.88)"
              submitButtonText="Submit"
              tagContainerStyle={{
                flexBasis: '100%',
                backgroundColor: '#CBF9F9',
              }}
            />
          </View>
        )}
        {domainValues && status === 'success' && domainValues.length === 0 && (
          <>
          <CustomTextAreaInput
            field={field}
            visitFieldUpdateContext={visitFieldContext}
            onChange={onChange}
          />
          <Text style={{fontSize: 10, color: "orange"}}>Unable to load list. Please type manually</Text>
          </>
        )}
        {status === 'loading' && <Text>Loading...</Text>}
        {status === 'error' && <Text>Error loading data</Text>}
    </>
  );
};

export default MultiSelectComp;
