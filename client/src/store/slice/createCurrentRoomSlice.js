import { produce } from 'immer';

export const currentRoomInit = { messages: [], currentRoom: null };

export const createCurrentRoomSlice = (set, get) => ({
  ...currentRoomInit,

  setCurrentRoom: currentRoom => set({ currentRoom }),

  setMessages: messages => set({ messages }),

  addMessage: message =>
    set(
      produce(state => {
        state.messages.push(message);
      })
    ),
});
