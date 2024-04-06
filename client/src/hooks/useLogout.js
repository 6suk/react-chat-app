import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { useAuthContext } from '../context/AuthContext';
import { useFetch } from '../context/FetchContext';

const useLogout = () => {
  const [isLoading, setIsLoading] = useState();
  const { setAuthUser } = useAuthContext();
  const fs = useFetch();

  const logout = async () => {
    try {
      const response = await fs.post('/auth/logout');

      if (response.error) {
        throw new Error(response.error);
      }

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
