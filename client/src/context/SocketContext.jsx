import { createContext, useContext, useEffect, useState } from 'react';

import { io } from 'socket.io-client';

import useRoomStore from '../store/useRoomStore';
import { useAuthContext } from './AuthContext';

export const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [socket, setSocket] = useState(null);
  const { currentRoom } = useRoomStore();

  useEffect(() => {
    if (authUser) {
      const socket = io(import.meta.env.VITE_BASE_URL, {
        query: {
          userId: authUser.id,
        },
      });
      socket.emit('refresh');
      setSocket(socket);
      if (currentRoom);
    } else {
      socket?.close;
      setSocket(null);
    }

    return () => {
      socket?.close();
      setSocket(null);
    };
  }, [authUser]);

  useEffect(() => {
    console.log(currentRoom?.id);
    if (currentRoom?.id) {
      socket?.emit('join', currentRoom.id);
    }
  }, [currentRoom?.id, socket]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
