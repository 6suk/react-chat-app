import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { useFetch } from '@context/FetchContext';
import useRoomStore from '@store/useRoomStore';

const useSendMessage = () => {
  const fs = useFetch();
  const { currentRoom, setMessages, messages } = useRoomStore();
  const [isLoading, setIsLoading] = useState();

  const sendMessage = async message => {
    try {
      handleInputErrors(message);
      setIsLoading(true);

      const responseMessage = await fs.post(
        `/messages/send/${currentRoom.id}`,
        {
          body: JSON.stringify({
            content: message,
          }),
        }
      );

      if (responseMessage) {
        setMessages([...messages, responseMessage.message]);
      }
    } catch (error) {
      toast.error(error.message);
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
