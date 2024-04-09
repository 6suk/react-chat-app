import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const initialStata = {
  messages: [],
  updateRooms: [],
  currentRoom: null,
};

const useRoomStore = create(
  devtools(set => ({
    messages: initialStata.messages,
    setMessages: messages => set({ messages }),

    currentRoom: initialStata.currentRoom,
    setCurrentRoom: currentRoom => set({ currentRoom }),

    updateRooms: initialStata.updateRooms,
    setUpdateRooms: updateRooms => set({ updateRooms }),

    addUpdateRooms: id =>
      set(state => ({ updateRooms: [...state.updateRooms, id] })),
    removeUpdateRooms: id =>
      set(state => ({
        updateRooms: otherRooms(state.updateRooms, id),
      })),

    resetToInitial: () => set({ ...initialStata }),
  }))
);

const otherRooms = (ids, targetId) => {
  return ids.filter(id => id !== targetId);
};

export default useRoomStore;
