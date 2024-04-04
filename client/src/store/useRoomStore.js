import { create } from 'zustand';

const useRoomStore = create(set => ({
  messages: [],
  setMessages: messages => set({ messages }),

  currentRoom: null,
  // Room Object
  setCurrentRoom: currentRoom => set({ currentRoom }),

  updateRooms: [],
  setUpdateRooms: updateRooms => set({ updateRooms }),
  addUpdateRooms: id =>
    set(state => ({ updateRooms: [...state.updateRooms, id] })),
  removeUpdateRooms: id =>
    set(state => ({
      updateRooms: otherRooms(state.updateRooms, id),
    })),
}));

const otherRooms = (ids, targetId) => {
  return ids.filter(id => id !== targetId);
};
export default useRoomStore;
