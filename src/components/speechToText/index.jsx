import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Voice from '@react-native-community/voice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {setSpeechOn} from '../../slices/visitCacheSlice';

const TextAreaWithSpeech = ({value, onChange, defaultValue}) => {
  const [isLoading, setLoading] = useState(false);
  const {isSpeechOn} = useAppSelector(state => state.persistedVisists);
  const dispatch = useAppDispatch();
  const speechStartHandler = e => {
    console.log('speechStart successful', e);
  };
  const speechEndHandler = e => {
    console.log('speechEnd handler');
  };
  const speechResultsHandler = e => {
    console.log('speech result handler');
    const text = e.value[0];
    console.log('text', text);
    // setResult(text);
    onChange(text);
  };
  const startRecording = async locale => {
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultsHandler;
    setLoading(true);
    dispatch(setSpeechOn(true))
    try {
      await Voice.start(locale);
    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {
    console.log('stop recording');
    try {
      await Voice.stop();
      Voice.destroy().then(Voice.removeAllListeners);
      setLoading(false);
      dispatch(setSpeechOn(false))
    } catch (error) {
      console.log('error', error);
    }
    dispatch(setSpeechOn(false))
  };
  
  return (
    <>
      {!isLoading && (
        <TouchableOpacity
          onPress={() => startRecording('en-Us')}
          // disabled={isSpeechOn}
          style={{
            ...StyleSheet.absoluteFillObject,
            alignSelf: 'flex-end',
            alignItems: 'flex-end',
            margin: 3,
            marginRight: -3,
            marginTop: -25,
            position: 'absolute'
          }}>
          <Ionicons
            maxFontSizeMultiplier={1}
            name="mic"
            size={20}
            // style={{color: isSpeechOn ? 'gray' : 'blue'}}
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
            marginTop: -25,
            position: 'absolute',
            zIndex: 20,
          }}>
          <Ionicons
            maxFontSizeMultiplier={1}
            name="square"
            size={15}
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
