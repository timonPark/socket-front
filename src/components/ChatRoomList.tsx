import React, { useEffect, useState } from 'react';
import { getChatRooms } from '../services/chatService';
import { ChatRoom } from '../types/ChatRoom';

const ChatRoomList: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const data = await getChatRooms();
        setChatRooms(data);
        setLoading(false);
      } catch (err) {
        setError('채팅방 목록을 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>채팅방 목록</h1>
      {chatRooms.length === 0 ? (
        <p>채팅방이 없습니다.</p>
      ) : (
        <ul>
          {chatRooms.map((room) => (
            <li key={room.id}>{room.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatRoomList;
