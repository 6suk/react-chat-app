import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { useFetch } from '@context/FetchContext';
import { getActions } from '@store/index';

const useLogout = () => {
  const fs = useFetch();
  const [isLoading, setIsLoading] = useState();
  const { resetToInitial } = getActions();

  const logout = async () => {
    try {
      const response = await fs.post('/auth/logout');

      if (response.error) {
        throw new Error(response.error);
      }

      toast.success(response.logout.message);
      resetToInitial(); // 스토어 초기화
      localStorage.clear();
    } catch (error) {
      console.log('🚨 useLogout Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, logout };
};

export default useLogout;
