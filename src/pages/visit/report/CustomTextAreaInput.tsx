import React, { useState } from "react";
import Field from "../../../models/visit/reportStructure/field";
import VisitFieldUpdateContext from "../../../models/visit/VisitFieldUpdateContext";
import TextAreaWithSpeech from "../../../components/speechToText";

const CustomTextAreaInput: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
  onChange: (value:any) => void
}> = ({field, visitFieldUpdateContext, onChange}) => {  
  return <TextAreaWithSpeech 
    value={field.fieldValue} 
    onChange={onChange}
    placeholder={field.placeholder || ""}
    defaultValue={field.defaultValue || ""}/>
}

export default CustomTextAreaInput;