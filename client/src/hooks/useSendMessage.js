import { useState } from 'react';
import APIService from '../utils/APIService';
import useRoomStore from '../store/useRoomStore';
import toast from 'react-hot-toast';

const useSendMessage = () => {
  const as = new APIService();
  const { currentRoom, setMessages, messages } = useRoomStore();
  const [isLoading, setIsLoading] = useState();

  const sendMessage = async message => {
    try {
      handleInputErrors(message);
      setIsLoading(true);

      const responseMessage = await as.post(`/room/${currentRoom.id}`, {
        body: JSON.stringify({
          content: message,
        }),
      });

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
