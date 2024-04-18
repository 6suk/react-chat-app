import { useCallback, useEffect, useState } from 'react';

import { useFetch } from '@context/FetchContext';
import { getActions } from '@store/index';
import { useBoundStore } from '@store/useBoundStore';

const useRoomMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setMessages } = getActions();
  const fs = useFetch();

  // fetchMessages
  useEffect(() => {
    const unsub = useBoundStore.subscribe(
      state => state.currentRoom,
      currentRoom => {
        if (currentRoom?.id) fetchRoomMessages(currentRoom.id);
      },
      {
        fireImmediately: true,
      }
    );
    return unsub;
  }, []);

  const fetchRoomMessages = useCallback(async id => {
    setIsLoading(true);
    try {
      const response = await fs.get(`/messages/${id}`);
      setMessages(response.messages);
    } catch (error) {
      console.log('🚨 useGetMessages Error', error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading };
};

export default useRoomMessages;
