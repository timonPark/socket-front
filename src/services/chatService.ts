import api from './api'; // axios 인스턴스 가져오기

// 채팅방 리스트 가져오기
export const getChatRooms = async () => {
  const response = await api.get('/chatrooms'); // baseURL + '/chatrooms'로 요청
  return response.data;
};

// 채팅방 생성하기
export const createChatRoom = async (roomName: string) => {
  const response = await api.post('/chatrooms', { name: roomName });
  return response.data;
};
