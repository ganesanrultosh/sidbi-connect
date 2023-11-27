import moment from 'moment';
import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, View, StyleSheet, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker';

import styles from './styles';
import TextAreaWithSpeech from '../speechToText';
import MultiSelectComp from '../multiselectcomp';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Input: React.FC<{
  title: string;
  type: 'text' | 'date' | 'textarea' | 'radio' | 'groupText' | 'multiselect';
  value: string;
  placeholder?: string;
  listofValues?: string[];
  onChange: (v: any) => void;
  defaultValue: any;
  onBlur?: () => void;
  domainValue?: string;
  group?: {
    groupTitle: string;
    groupFields: { fieldId: string; fieldTitle: string; fieldValue: string }[];
  }[];
  onChangeGroupItem?: (
    v: any,
    groupItemIndex: number,
    groupFieldIndex: number,
  ) => void;
}> = ({
  title,
  type,
  value,
  placeholder,
  listofValues,
  domainValue,
  onChange,
  defaultValue,
  onBlur = () => { },
  group,
  onChangeGroupItem,
}) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showSpeech, setShowSpeech] = useState(false)

    const getSpeechText = (text: string) => {
      onChange(text)
      setShowSpeech(false)
    }

    const getInput = () => {
      switch (type) {
        case 'text':
          return (
            <View style={[styles.inputContainer]}>
              <TextInput
                value={value || defaultValue}
                style={styles.input}
                onChangeText={t => onChange(t)}
                defaultValue={defaultValue}
                maxFontSizeMultiplier={1}
                onBlur={onBlur}
              />
            </View>
          );

        case 'textarea':
          return (
            <View style={[styles.textAreaContainer]}>
              <TouchableOpacity onPress={() => setShowSpeech(true)}
              style={{padding: 10, ...StyleSheet.absoluteFillObject,
              // marginTop: -5,
              position: 'absolute'}}
              >
                <Ionicons
                  maxFontSizeMultiplier={1}
                  name="mic"
                  size={25}
                  style={{color: "blue"}}
                />
              </TouchableOpacity>
              <TextInput
                value={value || defaultValue}
                style={[styles.input, styles.textArea]}
                multiline={true}
                numberOfLines={6}
                placeholder={placeholder}
                placeholderTextColor="rgba(129,102,102,0.44)"
                onChangeText={t => onChange(t)}
                defaultValue={defaultValue}
                maxFontSizeMultiplier={1}
              />
              <Modal visible={showSpeech}>
                <TextAreaWithSpeech 
                  value={value || defaultValue} 
                  onChange={getSpeechText} 
                  placeholder={"Start speaking to record notes."} 
                  defaultValue={defaultValue}/>
              </Modal>
            </View>
          );

        case 'radio':
          return (
            <View style={styles.radioContainer}>
              {listofValues &&
                listofValues?.length > 0 &&
                listofValues?.map(item => {
                  return (
                    <TouchableOpacity
                      key={item}
                      style={styles.radioItem}
                      onPress={() => {
                        onChange(item);
                      }}>
                      <View style={styles.radioBtn}>
                        {((value && value === item) ||
                          (!value && defaultValue === item)) && (
                            <View style={styles.selectedRadio} />
                          )}
                      </View>
                      <Text
                        maxFontSizeMultiplier={1}
                        style={styles.radioItemText}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          );

        case 'date':
          return (
            <View>
              <TouchableOpacity
                style={[styles.inputContainer]}
                onPress={() => {
                  setShowDatePicker(!showDatePicker);
                }}>
                <Text
                  onPress={() => {
                    setShowDatePicker(true);
                  }}
                  style={[styles.input, styles.pt5]}
                  maxFontSizeMultiplier={1}>
                  {value ? moment(value).format('DD-MM-YYYY') : placeholder}
                </Text>
              </TouchableOpacity>
              <DatePicker
                modal
                mode="date"
                open={showDatePicker}
                date={
                  value
                    ? new Date(moment(value, 'YYYYMMDD').toISOString())
                    : new Date()
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

        case 'groupText':
          return (
            <View style={styles.group}>
              {group?.map((item, index) => {
                return (
                  <View key={`${index}-${item.groupTitle}`}>
                    <Text maxFontSizeMultiplier={1} style={styles.groupTitle}>
                      {item.groupTitle}
                    </Text>
                    {item.groupFields.map((gField, gFIndex) => {
                      return (
                        <View style={styles.gField} key={`gf-${gField.fieldId}`}>
                          <Text
                            maxFontSizeMultiplier={1}
                            style={styles.gFieldLabel}>
                            {gField.fieldTitle}
                          </Text>
                          <View style={[styles.gInputContainer]}>
                            <TextInput
                              value={gField.fieldValue}
                              style={styles.input}
                              onChangeText={t => {
                                if (onChangeGroupItem) {
                                  onChangeGroupItem(t, index, gFIndex);
                                }
                              }}
                              defaultValue={defaultValue}
                              maxFontSizeMultiplier={1}
                            />
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          );
        case 'multiselect':
          return <View><MultiSelectComp domainValue={domainValue} onChange={onChange} /></View>
      }
    };

    return (
      <View>
        <Text maxFontSizeMultiplier={1} style={styles.label}>
          {title}
        </Text>
        {getInput()}
      </View>
    );
  };

export default Input;
