// CustomDropDownEditable.js
import React, { useEffect, useState } from 'react'
import CustomDropDown from './CustomDropDown'
import CustomInput from './CustomInput'

const CustomDropDownEditable = (props : any) => {
  const {
    field: { name, value},
    form: { setFieldValue },
    list: any  } = props

  const [type, setType] = useState('dropdown')

  useEffect(() => {
    if(value === "custom") {
      setType('textbox')
      setFieldValue(name, "")
    } 
  }, [value])

  return (props.list && type === "dropdown") ? 
    <CustomDropDown {...props}/> :
    <CustomInput {...props} autoFocus={props.list !== undefined}/>
}


export default CustomDropDownEditable