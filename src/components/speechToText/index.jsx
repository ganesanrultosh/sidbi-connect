import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Voice from '@react-native-community/voice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TextAreaWithSpeech = ({value, onChange, defaultValue}) => {
  const [result, setResult] = useState(value || defaultValue);
  const [isLoading, setLoading] = useState(false);
  const speechStartHandler = e => {
    console.log('speechStart successful', e);
  };
  const speechEndHandler = e => {
    Voice.stop();
    setLoading(false);
    console.log('stop handler', e);
  };
  const speechResultsHandler = e => {
    const text = e.value[0];
    console.log('text', text);
    setResult(existingText => existingText + ' ' + text);
  };
  const startRecording = async locale => {
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
      console.log('result', result);
      onChange(result);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    return () => {
      stopRecording();
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <>
      {!isLoading && (
        <TouchableOpacity
          onPress={() => startRecording('en-Us')}
          style={{
            ...StyleSheet.absoluteFillObject,
            alignSelf: 'flex-end',
            alignItems: 'flex-end',
            margin: 3,
          }}>
          <Ionicons
            maxFontSizeMultiplier={1}
            name="mic"
            size={20}
            style={{color: 'blue'}}
          />
        </TouchableOpacity>
      )}
      {isLoading && (
        <TouchableOpacity
          onPress={() => stopRecording()}
          style={{
            ...StyleSheet.absoluteFillObject,
            alignSelf: 'flex-end',
            alignItems: 'flex-end',
            margin: 3,
            zIndex: 20,
          }}>
          <Ionicons
            maxFontSizeMultiplier={1}
            name="square"
            size={20}
            style={{color: 'red'}}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    backgroundColor: 'black',
  },
});

export default TextAreaWithSpeech;
