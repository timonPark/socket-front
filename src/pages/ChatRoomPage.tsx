import React from 'react';
import { useParams } from 'react-router-dom';
import ChatRoom from '../components/ChatRoom'; // 채팅방 컴포넌트 가져오기

const ChatRoomPage: React.FC = () => {
    const { roomId } = useParams<{ roomId: string }>(); // 방 번호(roomId) 파라미터 받아오기

    return (
        <div>
            <h1>채팅방 번호: {roomId}</h1>
            <ChatRoom roomId={roomId} /> {/* roomId를 ChatRoom 컴포넌트로 전달 */}
        </div>
    );
};

export default ChatRoomPage;
