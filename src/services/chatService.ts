import axios from 'axios';
import { ChatRoom } from '../types/ChatRoom';

// 채팅방 리스트를 가져오는 함수
export const getChatRooms = async (): Promise<ChatRoom[]> => {
  const response = await axios.get('http://localhost:8788/api/chatrooms');
  return response.data;
};
