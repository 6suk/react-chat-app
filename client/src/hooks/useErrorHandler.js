import toast from 'react-hot-toast';

import { getActions, getAuthUser } from '@store/index';

const LOADING = '토큰을 갱신 중입니다.';
const SUCCESS = '토근이 갱신 되었습니다!';
const ERROR_TITLE = '재로그인 필요 : ';
const ERROR = '토근 갱신에 실패했습니다.';

const useErrorHandler = () => {
  const authUser = getAuthUser();
  const { resetToInitial, setCurrentRoom, getRooms } = getActions();

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const initOptions = {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  const refreshToken = async () => {
    const path = baseURL + '/auth/token';
    const options = {
      ...initOptions,
      method: 'POST',
      body: JSON.stringify({ user: authUser }),
    };

    toast.loading(LOADING, { id: 'token' });
    try {
      const tokenResponse = await fetch(path, options);
      if (tokenResponse.ok) {
        setTimeout(() => {
          toast.success(SUCCESS, {
            id: 'token',
          });
        }, 300);
      } else {
        const json = await tokenResponse.json();
        throw new Error(json.error);
      }
    } catch (error) {
      toast.dismiss('token');
      console.log('🚨 refresh token Error! : ', error.message);
      throw new Error(ERROR_TITLE + (error.message || ERROR));
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
