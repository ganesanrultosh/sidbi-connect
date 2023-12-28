import {Text, View} from 'react-native';
import React, {useState} from 'react';
import Field from '../../../models/visit/reportStructure/field';
import {RadioButton} from 'react-native-paper';
import Visit from '../../../models/visit/visit';
import VisitFieldUpdateContext from '../../../models/visit/VisitFieldUpdateContext';

const CustomRadioInput: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
  onChange: (value:any) => void
}> = ({field, visitFieldUpdateContext, onChange}) => {
  const [value, setValue] = useState<string>();
  return (
    <View style={{backgroundColor: '#FFFFFF', marginTop: 5}}>
      <RadioButton.Group
        onValueChange={onChange}
        value={value || ''}>
        {field.listofValues &&
          field.listofValues.map((item: any) => {
            return (
              <View
                key={`v1-${item}`}
                style={{flexDirection: 'row', alignContent: 'center'}}>
                <View
                  key={`v3-${item}`}
                  style={{flex: 0.1, alignItems: 'flex-start'}}>
                  <RadioButton.Android value={item} />
                </View>
                <View
                  key={`v2-${item}`}
                  style={{flex: 0.9, alignSelf: 'center'}}>
                  <Text>{item}</Text>
                </View>
              </View>
            );
          })}
      </RadioButton.Group>
    </View>
  );
};

export default CustomRadioInput;
