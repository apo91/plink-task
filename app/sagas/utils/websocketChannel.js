import { eventChannel } from 'redux-saga';

export default function websocketChannel(
  url: string,
  options: {
    onMessage: (emitter: Subscribe<Any>, event: MessageEvent) => void,
    onEvent: (emitter: Subscribe<Any>, event: Event) => void
  }
) {
  return eventChannel(emitter => {
    const ws = new WebSocket(url);
    ws.onmessage = event => {
      options.onMessage(emitter, event);
    };
    ws.onerror = event => {
      options.onEvent(emitter, event);
    };
    return () => {
      console.log('closing websocket');
      ws.close();
    };
  });
}
