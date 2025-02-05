import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: 'http://35.172.251.131:8080', // API 기본 URL
  timeout: 5000,
});

// 응답 인터셉터 설정
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/signup'; // 401 발생 시 리다이렉트
    }
    return Promise.reject(error);
  }
);

export default apiClient;