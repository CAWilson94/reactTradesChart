import React, { useEffect, useRef } from 'react';
import './style.css';

type Props = {};

const url: string =
  'wss://www.bitmex.com/realtime?subscribe=trade:XBTUSD,liquidation:XBTUSD';

const App = (props: Props) => {
  const connection = useRef<WebSocket | null>(null);

  const dataMapper = (eventData: any) => {
    if (eventData.data) {
      let data = JSON.parse(eventData.data);
      if (data.table) {
        console.log(data.data[0]);
      }
    }
  };

  useEffect(() => {
    const socket = new WebSocket(url);
    // Open Connection
    socket.addEventListener('open', (event) => {
      socket.send('Connection Established');
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      dataMapper(event);
    });

    connection.current = socket;

    return () => {
      // Close the WebSocket connection when the component unmounts
      if (connection.current) {
        connection.current.close();
      }
    };
  }, []);

  return <div></div>;
};

export default App;
