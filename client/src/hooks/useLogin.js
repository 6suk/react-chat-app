import { useState } from 'react';
import toast from 'react-hot-toast';

import { useFetch } from '@context/FetchContext';
import { getActions } from '@store/index';

const useLogin = () => {
  const fs = useFetch();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = getActions();

  const login = async (name, gender) => {
    try {
      setIsLoading(true);
      handleInputErrors(name, gender);

      const response = await fs.post('/auth/login', {
        body: JSON.stringify({
          name,
          gender,
        }),
      });

      setAuthUser(response.user);
    } catch (error) {
      console.log('🚨 useLogin Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputErrors = (name, gender) => {
    if (!name.trim() || !gender) {
      toast.error('닉네임 및 성별은 필수 항목입니다!');
      throw new Error('닉네임 및 성별은 필수 항목입니다!');
    }
  };

  return { isLoading, login };
};

export default useLogin;
