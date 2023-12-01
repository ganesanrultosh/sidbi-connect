import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Field from '../../../models/visit/reportStructure/field';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import Visit from '../../../models/visit/visit';
import VisitFieldUpdateContext from '../../../models/visit/VisitFieldUpdateContext';

const CustomDateInput: React.FC<{
  field: Field;
  visitFieldUpdateContext: VisitFieldUpdateContext;
  onChange: (value: any) => void
}> = ({field, onChange}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [value, setValue] = useState(
  //   field.fieldValue || field.defaultValue || '',
  // );

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setShowDatePicker(!showDatePicker);
        }}>
        <Text
          style={{
            backgroundColor: "#FFFFFF",
            borderStyle: 'solid',
            borderColor: 'black',
            borderWidth: .75,
            borderRadius: 2,
            marginVertical: 10,
            height: 50,
            verticalAlign: "middle",
            paddingHorizontal: 20,
            fontWeight: "bold"
          }}
          onPress={() => {
            setShowDatePicker(true);
          }}
          maxFontSizeMultiplier={1}>
          {field.fieldValue ? moment(field.fieldValue).format('DD-MM-YYYY') : field.placeholder}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={showDatePicker}
        date={
          field.fieldValue ? new Date(moment(field.fieldValue, 'YYYYMMDD').toISOString()) : new Date()
        }
        onConfirm={date => {
          setShowDatePicker(false);
          onChange(moment(date).format('YYYYMMDD'));
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
        androidVariant="nativeAndroid"
      />
    </View>
  );
};

export default CustomDateInput;
