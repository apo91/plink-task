import { eventChannel } from 'redux-saga';

export default function countdownChannel(seconds: number) {
  let remaining = seconds;
  return eventChannel(emitter => {
    const interval = setInterval(() => {
      if (remaining > 0) {
        remaining -= 1;
      }
      emitter(remaining);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
}
