import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: 'http://10.100.2.33:8788/api', // 여기에 baseURL을 설정합니다.
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
