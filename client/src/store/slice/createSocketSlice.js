import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';

import url from '@/env.config';

export const socketInit = {
  socket: null,
};

export const createSocketSlice = (set, get) => ({
  ...socketInit,

  socketOpen: () => {
    const user = get().authUser;
    if (user) {
      const socket = io(url.base, {
        query: {
          userId: user.id,
        },
      });

      set({ socket });

      socket.on('onlineUser', onlineUsers => {
        get().setOnlineUsers(onlineUsers);
        get().setSortUser(onlineUsers);
      });

      socket.on('message', message => {
        const roomId = message.room;
        const currentRoom = get().currentRoom;
        const alarms = get().alarms;
        const room = get().findRoomById(roomId);

        // 1. currentRoom일 때
        if (roomId === currentRoom?.id) {
          get().addMessage(message);
          return;
        }

        // 2. currentRoom은 아니지만 joinRoom일 때 (알림)
        else {
          if (!alarms.includes(roomId)) {
            get().addAlarm(roomId);
          }
          get().toastAlarm(room, message);
        }
      });

      socket.on('new room', room => {
        console.log(room);
        get().addRoom(room);
      });

      socket.on('removed room', ({ roomIds, userId }) => {
        const currentRoom = get().currentRoom;
        const authUser = get().authUser;
        get().removeRoom(roomIds);

        if (roomIds.includes(currentRoom?.id)) {
          get().setCurrentRoom(null);
          if (userId !== authUser.id)
            toast.error('참여 중인 방이 삭제 되었습니다!');
        }
      });

      socket.on('new join', ({ id, joinedUsers }) => {
        get().addUsersToRoom(id, joinedUsers);
        const currentRoom = get().currentRoom;
        if (currentRoom?.id === id) {
          const room = get().findRoomById(id);
          get().setCurrentRoom(room);
        }
      });

      socket.on('new user', id => {
        get().addUser(id);
      });

      socket.on('removed user', id => {
        get().removeUser(id);
      });
    }
  },

  socketClose: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
      set({ socket: null });
    }
  },
});
