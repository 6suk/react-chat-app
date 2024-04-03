import { create } from 'zustand';

const useRoomStore = create(set => ({
  messages: [],
  setMessages: messages => set({ messages }),
  joinRoom: null,
  setJoinRoom: joinRoom => set({ joinRoom }),
}));

export default useRoomStore;
