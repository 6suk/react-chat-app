import { useState } from 'react';

import { useFetch } from '@context/FetchContext';
import { getCurrentRoom } from '@store/index';

const useSendMessage = () => {
  const fs = useFetch();
  const currentRoom = getCurrentRoom();
  const [isLoading, setIsLoading] = useState();

  const sendMessage = async message => {
    try {
      handleInputErrors(message);
      setIsLoading(true);

      await fs.post(`/messages/send/${currentRoom.id}`, {
        body: JSON.stringify({
          content: message,
        }),
      });
    } catch (error) {
      console.log('🚨 useSendMessage Error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputErrors = message => {
    if (!message.trim()) {
      throw new Error('메세지를 기입해주세요!');
    }
  };

  return { isLoading, sendMessage };
};

export default useSendMessage;
