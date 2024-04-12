import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';

export const socketInit = {
  socket: null,
};

export const createSocketSlice = (set, get) => ({
  ...socketInit,

  socketOpen: () => {
    const user = get().authUser;
    if (user) {
      const socket = io(import.meta.env.VITE_BASE_URL, {
        query: {
          userId: user.id,
        },
      });

      set({ socket });

      socket.on('onlineUser', onlineUsers => {
        console.log('🚀 ~ createSocketSlice ~ onlineUsers:', onlineUsers);
        get().setOnlineUsers(onlineUsers);
        get().setSortUser(onlineUsers);
      });

      socket.on('message', message => {
        console.log('🚀 ~ createSocketSlice ~ message:', message);

        const roomId = message.room;
        const currentRoom = get().currentRoom;
        const alarms = get().alarms;
        const room = get().findRoomById(roomId);
        console.log('🚀 ~ createSocketSlice ~ room:', room);

        // 1. currentRoom일 때
        if (roomId === currentRoom?.id) {
          get().addMessage(message);
          return;
        }

        // 2. currentRoom은 아니지만 joinRoom일 때
        else {
          if (!alarms.includes(roomId)) {
            get().addAlarm(roomId);
          }
          get().setMessageAlarm(room, message);
        }
      });

      socket?.on('new room', room => {
        get().addRoom(room);
      });

      socket?.on('removed room', ({ roomIds, userId }) => {
        const currentRoom = get().currentRoom;
        const authUser = get().authUser;
        get().removeRoom(roomIds);

        if (roomIds.includes(currentRoom?.id) && userId !== authUser.id) {
          set({ currentRoom: null });
          toast.error('참여 중인 방이 삭제 되었습니다!');
        }
      });

      socket?.on('new join', ({ id, joinedUsers }) => {
        get().addUsersToRoom(id, joinedUsers);
        const currentRoom = get().currentRoom;
        if (currentRoom?.id === id) {
          const room = get().findRoomById(id);
          get().setCurrentRoom(room);
        }
      });

      socket?.on('new user', id => {
        get().addUser(id);
      });

      socket?.on('removed user', id => {
        get().removeUser(id);
      });
    }
  },

  socketClose: () => {
    const socket = get().socket;
    if (socket) {
      socket.close;
      set({ socket: null });
    }
  },
});
