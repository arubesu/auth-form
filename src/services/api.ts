import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies'

let cookies = parseCookies();

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['nextauth.token']}`
  }
});

const thirtyDays = 60 * 60 * 24 * 30;

api.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  if (error?.response?.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      cookies = parseCookies();

      const { 'nextauth.refreshToken': refreshToken } = cookies;

      api.post('/refresh', {
        refreshToken,
      }).then(response => {
        const { token } = response.data;

        setCookie(undefined, 'nextauth.token', token, {
          maxAge: thirtyDays,
          path: '/'
        })

        setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {
          maxAge: thirtyDays,
          path: '/'
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}`;
      });
    } else {
    }
  }
});