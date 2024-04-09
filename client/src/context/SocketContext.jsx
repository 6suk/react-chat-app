import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { useAuthContext } from '@context/AuthContext';
import useRoomStore from '@store/useRoomStore';

export const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const { currentRoom, setCurrentRoom } = useRoomStore();

  useEffect(() => {
    if (authUser) {
      const socket = io(import.meta.env.VITE_BASE_URL, {
        query: {
          userId: authUser.id,
        },
      });

      socket.emit('refresh');
      setSocket(socket);

      socket.on('onlineUser', onlineUsers => {
        console.log(onlineUsers);
        setOnlineUser(onlineUsers);
      });
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
    if (currentRoom?.id) {
      socket?.emit('join', currentRoom.id);

      if (!currentRoom.users.includes(authUser.id)) {
        setCurrentRoom({
          ...currentRoom,
          users: [...currentRoom.users, authUser.id],
        });
      }
    }
  }, [currentRoom?.id, socket]);

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
