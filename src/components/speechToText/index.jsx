import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  Pressable
} from 'react-native';
import Voice from '@react-native-community/voice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import showToast from '../../utils/showToast';
const TextAreaWithSpeech = ({
  value,
  onChange,
  placeholder,
  defaultValue,
  onBlur = () => { },
}) => {
  const [result, setResult] = useState(value || defaultValue);
  const [isLoading, setLoading] = useState(false);
  const speechStartHandler = e => {
    // console.log('speechStart successful', e);
  };
  const speechEndHandler = e => {
    setLoading(false);
    console.log('stop handler', e);
  };
  const speechResultsHandler = e => {
    const text = e.value[0];
    setResult(text)
  };
  const startRecording = async (locale) => {
    setLoading(true);
    try {
      await Voice.start(locale);
    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  const close = async () => {
    await stopRecording();
    onChange(result)
  };
  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View
    // style={styles.container}
    >
      <SafeAreaView>
        <View
          // style={styles.textInputStyle}
          style={{ justifyContent: 'center' }}
        >
          <TextInput
            value={result}
            style={[styles.input, styles.textArea]}
            multiline={true}
            numberOfLines={6}
            placeholder={placeholder}
            placeholderTextColor="rgba(129,102,102,0.44)"
            onChangeText={t => {
              setResult(t)
            }}
            defaultValue={defaultValue}
            maxFontSizeMultiplier={1}
          />
        </View>
        <View
          style={styles.btnContainer}
        >
          {!isLoading &&
            <View style={{ padding: 10, color: "red", justifyContent: 'center', alignSelf: 'center', margin: 5 }}>
              <Button
                title="English"
                onPress={() => startRecording('en-Us')}
                buttonStyle={{ justifyContent: 'flex-start' }}
              />
            </View>
          }
          {!isLoading &&
            <View style={{ padding: 10, color: "red", justifyContent: 'center', alignSelf: 'center', margin: 5 }}>
              <Button
                title="Hindi"
                onPress={() => startRecording('hi-IN')}
                buttonStyle={{ justifyContent: 'flex-start' }}
              />
            </View>
          }
          {isLoading && <View style={{ padding: 10, color: "red", justifyContent: 'center', alignSelf: 'center', margin: 5 }}><TouchableOpacity
            // style={styles.stop}
            onPress={stopRecording}>
            {/* <Text style={{fontWeight: 'bold'}}>Stop</Text> */}
            <Ionicons
              maxFontSizeMultiplier={1}
              name="square"
              size={35}
              style={{ color: "red", justifyContent: 'center', alignSelf: 'center' }}
            // color="#ffffff"
            />
          </TouchableOpacity></View>}
          <View style={{ padding: 10, color: "red", justifyContent: 'center', alignSelf: 'center', margin: 5, }}>
            <Pressable style={styles.button} onPress={close}>
              <Text style={styles.text}>Close</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: 'rgba(90,53,53,0.88)',
    height: '90%',
    padding: 0,
    marginHorizontal: 5,
    width: '90%',
  },
  textArea: {
    padding: 5,
    // backgroundColor: "red",
    alignSelf: 'flex-start',
    textAlign: 'left',
    textAlignVertical: 'top',
    height: "90%"
  },
  btnContainer: {
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#EFEFEF',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default TextAreaWithSpeech;
