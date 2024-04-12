import { useState } from 'react';
import toast from 'react-hot-toast';

import { useFetch } from '@context/FetchContext';
import { getActions } from '@store/index';

const useCreateRoom = () => {
  const fs = useFetch();
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentRoom } = getActions();

  const createRoom = async title => {
    try {
      setIsLoading(true);
      handleInputErrors(title);
      const room = await fs.post('/room', {
        body: JSON.stringify({ title }),
      });

      if (room.error) {
        throw new Error(room.error);
      }
      setCurrentRoom(room);
    } catch (error) {
      console.log('🚨 useLogin Error', error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputErrors = title => {
    if (!title.trim()) {
      throw new Error('제목은 필수 항목입니다!');
    }
  };

  return { isLoading, createRoom };
};

export default useCreateRoom;
