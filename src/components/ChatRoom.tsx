import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './ChatRoom.css'; // CSS 파일 임포트

const ChatRoom: React.FC<{ roomId: string | undefined }> = ({ roomId }) => {
    const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [nickname, setNickname] = useState<string>(''); // 닉네임 상태
    const [stompClient, setStompClient] = useState<Client | null>(null);

    useEffect(() => {
        const socket = new SockJS(`http://10.100.0.190:8788/ws`);
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: (str) => console.log(str),
        });

        client.onConnect = () => {
            console.log('Connected to WebSocket');
            client.subscribe(`/topic/chatroom/${roomId}`, (message) => {
                const messageBody = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, messageBody]);
            });
        };

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [roomId]);

    const sendMessage = () => {
        if (stompClient && nickname) {
            stompClient.publish({
                destination: `/app/chatroom/${roomId}/sendMessage`,
                body: JSON.stringify({ sender: nickname, content: newMessage, type: 'CHAT' }), // 닉네임 포함
            });
            setNewMessage('');
        }
    };

    return (
        <div>
            <h2>채팅방 {roomId}</h2>
            <div className="chat-container">
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-message ${msg.sender === nickname ? 'my-message' : 'other-message'}`}
                        >
                            <p className="message-sender">{msg.sender}</p>
                            <p className="message-content">{msg.content}</p>
                        </div>
                    ))}
                </div>
                <div className="chat-input-container">
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임을 입력하세요..."
                        className="nickname-input"
                    />
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        className="message-input"
                    />
                    <button onClick={sendMessage} className="send-button">전송</button>
                </div>
            </div>
        </div>
    );
};

export default ChatRoom;
