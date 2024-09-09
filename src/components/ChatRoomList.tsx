import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import
import { getChatRooms } from '../services/chatService';
import { ChatRoom } from '../types/ChatRoom';
import './ChatRoomList.css'; // 스타일 가져오기

const ChatRoomListPage: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // useNavigate 훅 선언

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

  // 특정 채팅방 클릭 시 실행되는 함수
  const handleChatRoomClick = (roomId: number) => {
    navigate(`/chatroom/${roomId}`); // 채팅방 번호에 맞게 이동
  };

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
            <ul className="chatroom-list">
              {chatRooms.map((room) => (
                  <li
                      key={room.id}
                      className="chatroom-item"
                      onClick={() => handleChatRoomClick(room.id)} // 클릭 이벤트 설정
                  >
                    {room.name}
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};

export default ChatRoomListPage;
