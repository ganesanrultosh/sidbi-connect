import { Text } from "react-native";
import React, { useState } from "react";
import Field from "../../../models/visit/reportStructure/field";
import { TextInput } from "react-native-paper";
import Visit from "../../../models/visit/visit";
import VisitFieldUpdateContext from "../../../models/visit/VisitFieldUpdateContext";

const CustomTextAreaInput: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
}> = ({field, visitFieldUpdateContext}) => {
  const [value, setValue] = useState<string>(field.fieldValue || field.defaultValue || "");
  return <TextInput
  mode="outlined"
  value={value}
  style={{marginVertical: 10}}
  multiline={true}
  numberOfLines={6}
  placeholder={field.placeholder || ""}
  placeholderTextColor="rgba(129,102,102,0.44)"
  onChangeText={t => setValue(t)}
  defaultValue={field.defaultValue || ""}
  maxFontSizeMultiplier={1}
/>
}

export default CustomTextAreaInput;