import { produce } from 'immer';

export const roomsInit = {
  isRoomsLoading: false,
  rooms: [],
};

export const createRoomsSlice = (set, get) => ({
  ...roomsInit,

  getRooms: async () => {
    try {
      const fs = get().fetchInstance;
      set({ isRoomsLoading: true });
      const responseJson = await fs.get('/rooms');
      set({ rooms: responseJson.rooms });
    } catch (error) {
      console.log('🚨 useGetRooms Error', error.message);
    } finally {
      set({ isRoomsLoading: false });
    }
  },

  findRoomById: id => {
    return get().rooms.find(room => room.id === id);
  },

  addRoom: room =>
    set(
      produce(state => {
        state.rooms.push(room);
      })
    ),

  removeRoom: roomIds =>
    set(
      produce(state => {
        state.rooms = state.rooms.filter(room => !roomIds.includes(room.id));
      })
    ),

  addUsersToRoom: (id, users) =>
    set(
      produce(state => {
        const index = get().rooms.findIndex(room => room.id === id);
        if (index >= 0) {
          const updateRoom = { ...get().rooms[index], users };
          state.rooms[index] = updateRoom;
        }
      })
    ),
});
