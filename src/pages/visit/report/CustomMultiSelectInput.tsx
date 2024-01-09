import { Text, View } from "react-native";
import React from "react";
import Field from "../../../models/visit/reportStructure/field";
import Visit from "../../../models/visit/visit";
import VisitFieldUpdateContext from "../../../models/visit/VisitFieldUpdateContext";
import MultiSelectComp from "../../../components/multiselectcomp";

const CustomMultiSelectInput: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
  onChange: (value:any) => void
}> = ({field, visitFieldUpdateContext, onChange}) => {
  return <View><MultiSelectComp field={field} visitFieldContext={visitFieldUpdateContext} domainValue={field.domainValue} onChange={onChange} /></View>
}

export default CustomMultiSelectInput;