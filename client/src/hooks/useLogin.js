import { useState } from 'react';
import toast from 'react-hot-toast';

import { useAuthContext } from '@context/AuthContext';
import { useFetch } from '@context/FetchContext';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const fs = useFetch();

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

      if (response.error) {
        throw new Error(response.error || '다시 시도해주세요!');
      }

      setAuthUser(response);
      localStorage.setItem('user', JSON.stringify(response));
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
