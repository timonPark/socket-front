import React, { useEffect, useState } from 'react';
import { getChatRooms, createChatRoom } from '../services/chatService'; // 생성 API 추가
import { ChatRoom } from '../types/ChatRoom';
import Modal from 'react-modal';
import './ChatRoomList.css';

// 모달 스타일 설정
const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
  },
};

const ChatRoomList: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newRoomName, setNewRoomName] = useState<string>('');

  // 채팅방 리스트 불러오기
  useEffect(() => {
    fetchChatRooms();
  }, []);

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

  // 모달 열기/닫기
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 채팅방 생성 처리
  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return; // 빈 값 처리
    try {
      await createChatRoom(newRoomName);
      closeModal(); // 모달 닫기
      setNewRoomName(''); // 입력 필드 초기화
      fetchChatRooms(); // 채팅방 리스트 다시 불러오기
    } catch (err) {
      console.error('Error creating chat room:', err);
    }
  };

  if (loading) {
    return <p className="loading-message">로딩 중...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
      <div className="chat-room-list-container">
        <h1>채팅방 목록</h1>
        <button onClick={openModal} className="create-room-button">채팅방 생성</button>

        {/* 채팅방 리스트 */}
        {chatRooms.length === 0 ? (
            <p className="no-chatrooms">채팅방이 없습니다.</p>
        ) : (
            <ul className="chat-room-list">
              {chatRooms.map((room) => (
                  <li key={room.id} className="chat-room-item">
                    <p>{room.name}</p>
                  </li>
              ))}
            </ul>
        )}

        {/* 채팅방 생성 모달 */}
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customModalStyles} contentLabel="Create Chat Room">
          <h2>채팅방 생성</h2>
          <input
              type="text"
              placeholder="채팅방 이름을 입력하세요"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="modal-input"
          />
          <div className="modal-buttons">
            <button onClick={handleCreateRoom} className="create-button">생성</button>
            <button onClick={closeModal} className="cancel-button">취소</button>
          </div>
        </Modal>
      </div>
  );
};

export default ChatRoomList;
