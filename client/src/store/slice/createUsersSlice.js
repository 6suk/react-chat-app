import { produce } from 'immer';
import { toast } from 'react-hot-toast';

export const usersInit = {
  isUsersLoading: false,
  users: [],
  onlineUsers: [],
};

export const createUsersSlice = (set, get) => ({
  ...usersInit,

  getUsers: async fs => {
    try {
      set({ isUsersLoading: true });
      const response = await fs.get('/user');
      set({ users: response.users });
    } catch (error) {
      toast.error(error.message);
      console.log('🚨 useGetRooms Error', error.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  setUsers: users => set({ users }),
  setOnlineUsers: onlineUsers => set({ onlineUsers }),

  addUser: user =>
    set(
      produce(state => {
        state.users.push(user);
      })
    ),

  removeUser: userId =>
    set(
      produce(state => {
        state.users = state.users.filter(user => user.id !== userId);
      })
    ),

  setSortUser: onlineUsers =>
    set(
      produce(state => {
        const authUser = get().authUser;
        const users = get().users;
        const onlineUserIds = onlineUsers.filter(id => id !== authUser.id);

        if (onlineUserIds?.length > 0) {
          const onlineUsers = users.filter(user =>
            onlineUserIds.includes(user.id)
          );
          const otherUsers = users.filter(
            user => !onlineUserIds.includes(user.id)
          );

          state.users = [...onlineUsers, ...otherUsers];
        } else {
          state.users = users;
        }
      })
    ),
});
