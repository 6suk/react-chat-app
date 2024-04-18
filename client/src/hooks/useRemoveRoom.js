import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { useFetch } from '@context/FetchContext';

const useRemoveRoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const fs = useFetch();

  const removeRoom = async id => {
    try {
      setIsLoading(true);

      const response = await fs.delete('/room', {
        body: JSON.stringify({ rooms: [id] }),
      });

      if (response.rooms) {
        const result = response.rooms;
        const resultOne = result[0];

        if (!resultOne.ok) {
          throw new Error(resultOne.message);
        }
        toast.success('삭제가 완료되었습니다!');
      }
    } catch (error) {
      console.log('🚨 useLogout Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, removeRoom };
};

export default useRemoveRoom;
