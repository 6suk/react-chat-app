import { useState } from 'react';
import { toast } from 'react-hot-toast';

import APIService from '../utils/APIService';
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
  const [isLoading, setIsLoading] = useState();
  const { setAuthUser } = useAuthContext();
  const as = new APIService();

  const logout = async () => {
    try {
      const response = await as.post('/auth/logout');
      console.log(response);

      if (response.error) {
        throw new Error(response.error);
      }

      // setAuthUser(null);
      // localStorage.clear();
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
