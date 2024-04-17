import toast from 'react-hot-toast';

import url from '@/env.config';

import { getActions, getAuthUser } from '@store/index';

const useErrorHandler = () => {
  const authUser = getAuthUser();
  const { resetToInitial, setCurrentRoom, getRooms } = getActions();

  const baseURL = url.api;
  const initOptions = {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  const refreshToken = async () => {
    const message = {
      LOADING: '토큰을 갱신 중입니다.',
      ERROR_TITLE: '재로그인 필요 : ',
      ERROR: '토근 갱신에 실패했습니다.',
    };

    const path = baseURL + '/auth/token';
    const options = {
      ...initOptions,
      method: 'POST',
      body: JSON.stringify(authUser),
    };

    toast.loading(message.LOADING, { id: 'token' });
    try {
      const tokenResponse = await fetch(path, options);
      const json = await tokenResponse.json();
      if (tokenResponse.ok) {
        setTimeout(() => {
          toast.success(json.message, {
            id: 'token',
          });
        }, 300);
      } else {
        throw new Error(json.error);
      }
    } catch (error) {
      toast.dismiss('token');
      console.log('🚨 refresh token Error! : ', error.message);
      throw new Error(message.ERROR_TITLE + (error.message || message.ERROR));
    }
  };

  const handle403Error = () => {
    resetToInitial();
    localStorage.clear();
  };

  const handle404Error = async () => {
    setCurrentRoom(null);
    getRooms();
  };

  return { refreshToken, handle403Error, handle404Error };
};

export default useErrorHandler;
