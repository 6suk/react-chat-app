import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useRoomStore from '../store/useRoomStore';

const useRealTimeMessages = () => {
  const { socket } = useSocketContext();
  const { currentRoom, setMessages, messages, updateRooms, addUpdateRooms } =
    useRoomStore();

  useEffect(() => {
    // message가 도착할 때
    socket?.on('message', message => {
      // 1. currentRoom일 때
      if (message.room === currentRoom?.id) {
        setMessages([...messages, message]);
        return;
      }
      // 2. currentRoom은 아니지만 joinRoom일 때
      else {
        if (!updateRooms.includes(message.room)) {
          addUpdateRooms(message.room);
        }
        console.log(`${message.room}방에 새로운 채팅이 왔어요!`);
      }
    });
    // 필수!
    return () => socket?.off('message');
  }, [socket, currentRoom?.id, messages]);
};

export default useRealTimeMessages;
