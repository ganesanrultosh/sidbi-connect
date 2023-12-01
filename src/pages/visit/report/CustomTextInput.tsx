import {Text} from 'react-native';

import React, { useState } from 'react';
import Field from '../../../models/visit/reportStructure/field';
import { TextInput } from 'react-native-paper';
import Visit from '../../../models/visit/visit';
import VisitFieldUpdateContext from '../../../models/visit/VisitFieldUpdateContext';

const CustomTextInput: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
  onChange: (value:any) => void
}> = ({field, onChange}) => {
  // const [value, setValue] = useState(field.fieldValue || field.defaultValue || "")
  return (
    <TextInput
      mode="outlined"
      value={field.fieldValue || ""}
      style={{
        marginVertical: 10,
      }}
      onChangeText={(text) => {
        onChange(text)
      }}
      defaultValue={field.defaultValue || ""}
      maxFontSizeMultiplier={1}
    />
  );
};

export default CustomTextInput;
