import React from 'react';
import {Text} from 'react-native';

export function CountDownTimer(props: {initialValue?: number}) {
  const [time, setTime] = React.useState(props.initialValue || 10);
  const timerRef = React.useRef(time);

  const getFormatedMins = (time: number | undefined): string => {
    if (!time) return '00';
    let mins = Math.floor(time / 60) > 0 ? Math.floor(time / 60) : '00';
    return `00${String(mins)}`.substring(`00${String(mins)}`.length - 2);
  };

  const getFormattedSecs = (time: number | undefined): string => {
    if (!time) return '';
    return `00${String(time % 60)}`.substring(
      `00${String(time % 60)}`.length - 2,
    );
  };

  React.useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Text>
      {`\n`}If OTP has not been received, you can retry after
      <Text style={{color: 'blue', fontWeight: 'bold'}}>
        {' '}
        {getFormatedMins(time)}:{getFormattedSecs(time)}{' '}
      </Text>
      mins.{`\n`}
    </Text>
  );
}
