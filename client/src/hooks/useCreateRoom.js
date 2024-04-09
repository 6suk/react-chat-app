import { useState } from 'react';
import toast from 'react-hot-toast';

import { useFetch } from '@context/FetchContext';
import useRoomStore from '@store/useRoomStore';

const useCreateRoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentRoom } = useRoomStore();
  const fs = useFetch();

  const createRoom = async title => {
    try {
      setIsLoading(true);
      handleInputErrors(title);
      const response = await fs.post('/room', {
        body: JSON.stringify({ title }),
      });

      if (response.error) {
        throw new Error(response.error);
      }

      setCurrentRoom(response);
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
