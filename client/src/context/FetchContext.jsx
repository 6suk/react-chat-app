import { createContext, useContext, useEffect, useState } from 'react';

import fetchService from '../utils/fetchService';
import { useAuthContext } from './AuthContext';

export const FetchContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFetch = () => useContext(FetchContext);

export const FetchContextProvider = ({ children }) => {
  const { authUser, setAuthUser } = useAuthContext();
  const [fetchInstance, setFetchInstance] = useState(null);

  // App 실행 시 fetchService 1번만 불러오기 (로그인 전, 로그인 후)
  useEffect(() => {
    const instance = new fetchService({
      url: import.meta.env.VITE_API_BASE_URL,

      initOptions: {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      },

      on401Error: async nextRequest => {
        console.log('🔥 Token 만료! : ', authUser);
        try {
          // refreshToken
          const tokenOptions = {
            body: JSON.stringify({ user: authUser }),
            method: 'POST',
          };
          const response = await instance.refreshToken(
            '/auth/token',
            tokenOptions
          );

          // DB에 존재하지 않는 유저
          if (response.status === 401) {
            console.log('유저 삭제!!');
            localStorage.clear();
            setAuthUser(null);
            return;
          }

          if (response.ok) {
            console.log('🔥 Token 갱신 완료! : ', authUser);

            // 기존 요청 re-fetch
            const { path, options } = nextRequest;
            const nextResponse = await fetch(path, options);
            return await nextResponse.json();
          }
        } catch (error) {
          console.log('🚨Error FetchContext on401Error : ', error.message);
          throw error;
        }
      },
    });

    setFetchInstance(instance);

    // Cleanup
    return () => {};
  }, [setAuthUser, authUser]);

  if (!fetchInstance) {
    // fetchInstance가 초기화 되지 않았을 땐 null 반환
    // fetchInstance가 준비되면 자식컴포넌트에게 fetchInstance 반환
    return null;
  }

  return (
    <FetchContext.Provider value={fetchInstance}>
      {children}
    </FetchContext.Provider>
  );
};
