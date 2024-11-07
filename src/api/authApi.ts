import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json', // 기본 헤더 설정
  },
});
export type userAuthResponse = {
  message: string;
  token: string;
};
export async function login(email: string, password: string) {
  return await authApi.post('/users/login', {
    email: email,
    password: password,
  });
}
export async function signUp(email: string, password: string) {
  return await authApi.post('/users/create', {
    email: email,
    password: password,
  });
}
