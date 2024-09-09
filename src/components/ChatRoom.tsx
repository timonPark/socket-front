import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import './ChatRoom.css';

interface ChatMessage {
    id: number;
    sender: string;
    content: string;
}

interface ChatRoomProps {
    roomId: string | undefined;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ roomId }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, sender: 'User1', content: `안녕하세요! 방번호 ${roomId}` },
        { id: 2, sender: 'User2', content: '반갑습니다!' },
    ]);

    const [newMessage, setNewMessage] = useState<string>('');
    const navigate = useNavigate(); // useNavigate 선언

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg = {
                id: messages.length + 1,
                sender: 'Me',
                content: newMessage,
            };
            setMessages([...messages, newMsg]);
            setNewMessage('');
        }
    };

    const handleLeaveChatRoom = () => {
        navigate('/chatrooms'); // 채팅방 목록으로 이동
    };

    return (
        <div className="chat-room-container">
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-message ${msg.sender === 'Me' ? 'my-message' : 'other-message'}`}>
                        <span className="chat-sender">{msg.sender}: </span>
                        <span className="chat-content">{msg.content}</span>
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    className="chat-input"
                />
                <button onClick={handleSendMessage} className="send-button">전송</button>
            </div>
            <button onClick={handleLeaveChatRoom} className="leave-button">채팅방 나가기</button>
        </div>
    );
};

export default ChatRoom;
