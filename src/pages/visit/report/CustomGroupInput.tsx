import {Text, View} from 'react-native';
import React from 'react';
import Field from '../../../models/visit/reportStructure/field';
import CustomTextInput from './CustomTextInput';
import VisitFieldUpdateContext from '../../../models/visit/VisitFieldUpdateContext';
import {useDispatch} from 'react-redux';
import {saveFieldValue} from '../../../slices/visitCacheSlice';

const CustomGroupInput: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
}> = ({field, visitFieldUpdateContext}) => {
  const dispatch = useDispatch();

  const onChange = (
    value: any,
    visitFieldUpdateContext: VisitFieldUpdateContext,
  ) => {
    dispatch(saveFieldValue({...visitFieldUpdateContext, value: value}));
  };

  return (
    <>
      {field.group.map((item, index) => {
        return (
          <View style={{margin: 10, backgroundColor: '#E1EAF4', padding: 10}} key={`group-field-${item.groupTitle}-${index}`}>
            <Text style={{marginVertical: 10, fontWeight: 'bold'}}>
              {item.groupTitle}
            </Text>
            {item.groupFields.map((field, gfIndex) => {
              return (
                <View key={`group-field-${field.fieldId}-${gfIndex}`}>
                  <Text style={{marginHorizontal: 10}}>{field.fieldTitle}</Text>
                  <CustomTextInput
                    field={field}
                    visitFieldUpdateContext={{
                      ...visitFieldUpdateContext,
                      groupFieldIndex: index,
                      groupItemIndex: gfIndex,
                    }}
                    onChange={(value: any) =>
                      onChange(value, {
                        ...visitFieldUpdateContext,
                        groupFieldIndex: gfIndex,
                        groupItemIndex: index,
                      })
                    }
                  />
                </View>
              );
            })}
          </View>
        );
      })}
    </>
  );
};

export default CustomGroupInput;
