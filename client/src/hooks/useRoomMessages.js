import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { useFetch } from '@context/FetchContext';
import useRoomStore from '@store/useRoomStore';

const useRoomMessages = () => {
  const fs = useFetch();

  const [isLoading, setIsLoading] = useState(false);
  const { currentRoom, setMessages } = useRoomStore();

  useEffect(() => {
    const fetchRoomMessages = async () => {
      setIsLoading(true);
      try {
        const response = await fs.get(`/room/${currentRoom.id}`);
        setMessages(response.messages);
      } catch (error) {
        toast.error(error.message);
        console.log('🚨 useGetMessages Error', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentRoom?.id) fetchRoomMessages();
  }, [currentRoom?.id]);

  return { isLoading };
};

export default useRoomMessages;
