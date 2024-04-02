import { useState } from 'react';
import toast from 'react-hot-toast';

import ApiService from '../utils/ApiService';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const as = new ApiService();

  const login = async (name, gender) => {
    try {
      setIsLoading(true);
      handleInputErrors(name, gender);

      const user = await as.fetchPost('/auth/login', {
        body: JSON.stringify({
          name,
          gender,
        }),
      });

      setAuthUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.log('🚨 useLogin Error', error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputErrors = (name, gender) => {
    if (!name.trim() || !gender) {
      throw new Error('닉네임 및 성별은 필수 항목입니다!');
    }
  };

  return { isLoading, login };
};

export default useLogin;
