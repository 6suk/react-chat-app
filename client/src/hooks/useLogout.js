import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { useAuthContext } from '@context/AuthContext';
import { useFetch } from '@context/FetchContext';
import useRoomStore from '@store/useRoomStore';

const useLogout = () => {
  const [isLoading, setIsLoading] = useState();
  const { setAuthUser } = useAuthContext();
  const { resetToInitial } = useRoomStore();
  const fs = useFetch();

  const logout = async () => {
    try {
      const response = await fs.post('/auth/logout');

      if (response.error) {
        throw new Error(response.error);
      }

      resetToInitial(); // 스토어 초기화
      localStorage.clear();
      setAuthUser(null);
    } catch (error) {
      console.log('🚨 useLogout Error', error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, logout };
};

export default useLogout;
