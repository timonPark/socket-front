import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

interface Message {
  sender: string;
  content: string;
  roomId: string;
}

const App: React.FC = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Clean up: Disconnect when component unmounts
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [stompClient]);

  const connectWebSocket = () => {
    const client: Client = new Client({
      brokerURL: 'ws://localhost:8080/chat',
      debug: (str: string) => {
        console.log(str)
      },
    });
    // WebSocket 연결을 시작
    handleConnect(client);
    client.activate();
  };

  const handleConnect = (client: Client) => {
    console.log('Connected');
    setStompClient(client);
  };

  const joinRoom = () => {
    if (!stompClient || !stompClient.connected) {
      alert("Please connect to the WebSocket server first.");
      return;
    }
    if (stompClient) {
      stompClient.onConnect = () => {
        if (currentRoomId) {
          stompClient.unsubscribe('/topic/' + currentRoomId);
        }
        setCurrentRoomId(roomId);
        stompClient.subscribe('/topic/room1', (messageOutput) => {
          const newMessage: Message = JSON.parse(messageOutput.body);
          setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      }
    }
  };

  const sendMessage = () => {
    if (!stompClient || !stompClient.connected) {
      alert("Please connect to the WebSocket server first.");
      return;
    }
    const messageObject: Message = {
      content: message,
      sender: userId,
      roomId: currentRoomId!,
    };
    stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify(messageObject),
    });
    setMessage(''); // 메시지 전송 후 입력 필드 초기화
  };

  const renderMessages = () => {
    return chatMessages.map((msg, index) => (
      <p key={index}>{msg.sender}: {msg.content}</p>
    ));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your user ID"
        />
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter room ID"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here..."
        />
        <button onClick={connectWebSocket}>Connect</button>
        <button onClick={joinRoom}>Join Room</button>
        <button onClick={sendMessage}>Send</button>
      </div>
      <div id="chat">
        {renderMessages()}
      </div>
    </div>
  );
};

export default App;
