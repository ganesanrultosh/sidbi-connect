import { Text } from "react-native";
import React from "react";
import Field from "../../../models/visit/reportStructure/field";
import Visit from "../../../models/visit/visit";
import VisitFieldUpdateContext from "../../../models/visit/VisitFieldUpdateContext";

const CustomMultiSelectInput: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
}> = ({field, visitFieldUpdateContext}) => {
  return <Text style={{marginVertical: 10, color: "red"}}>Yet to be implemented</Text>
}

export default CustomMultiSelectInput;