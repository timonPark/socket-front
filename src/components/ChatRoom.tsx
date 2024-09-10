import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatRoom: React.FC<{ roomId: string | undefined }> = ({ roomId }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [stompClient, setStompClient] = useState<Client | null>(null);

    useEffect(() => {
        // WebSocket 서버 연결
        const socket = new SockJS('http://10.100.2.33:8788/ws'); // WebSocket URL로 변경
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
        });

        client.onConnect = () => {
            console.log('Connected to WebSocket');

            client.subscribe('/topic/public', (message) => {
                const messageBody = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, messageBody.content]);
            });

            // 사용자 참가 메시지 전송
            client.publish({
                destination: '/app/chat.addUser',
                body: JSON.stringify({ sender: 'User', type: 'JOIN' }),
            });
        };

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [roomId]);

    const sendMessage = () => {
        if (stompClient) {
            stompClient.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify({ sender: 'User', content: newMessage, type: 'CHAT' }),
            });
            setNewMessage('');
        }
    };

    return (
        <div>
            <h2>채팅방 {roomId}</h2>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
            />
            <button onClick={sendMessage}>전송</button>
        </div>
    );
};

export default ChatRoom;
