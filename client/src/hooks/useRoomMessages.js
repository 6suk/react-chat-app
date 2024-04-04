import { useEffect, useState } from 'react';

import useRoomStore from '../store/useRoomStore';
import APIService from '../utils/APIService';
import toast from 'react-hot-toast';

const useRoomMessages = () => {
  const as = new APIService();

  const [isLoading, setIsLoading] = useState(false);
  const { currentRoom, setMessages } = useRoomStore();

  useEffect(() => {
    const fetchRoomMessages = async () => {
      setIsLoading(true);
      try {
        const response = await as.get(`/room/${currentRoom.id}`);
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
