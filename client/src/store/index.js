import { useBoundStore } from '@store/useBoundStore';

const messagesSelector = state => state.messages;
const currentRoomSelector = state => state.currentRoom;
const alarmsSelector = state => state.alarms;
const authUserSelector = state => state.authUser;
const socketSelector = state => state.socket;
const isRoomsLoadingSelector = state => state.isRoomsLoading;
const roomsSelector = state => state.rooms;
const isUsersLoadingSelector = state => state.isUsersLoading;
const usersSelector = state => state.users;
const onlineUsersSelector = state => state.onlineUsers;

// use
export const useCurrentRoom = () => useBoundStore(currentRoomSelector);
export const useMessages = () => useBoundStore(messagesSelector);
export const useAuthUser = () => useBoundStore(authUserSelector);
export const useRooms = () => useBoundStore(roomsSelector);
export const useIsRoomsLoading = () => useBoundStore(isRoomsLoadingSelector);
export const useIsUsersLoading = () => useBoundStore(isUsersLoadingSelector);
export const useUsers = () => useBoundStore(usersSelector);

// get
export const getCurrentRoom = () =>
  currentRoomSelector(useBoundStore.getState());
export const getAuthUser = () => authUserSelector(useBoundStore.getState());
export const getRooms = () => roomsSelector(useBoundStore.getState());
export const getUsers = () => usersSelector(useBoundStore.getState());

// actions
export const getActions = () => {
  const setCurrentRoom = useBoundStore.getState().setCurrentRoom;
  const setMessages = useBoundStore.getState().setMessages;
  const addMessage = useBoundStore.getState().addMessage;
  const resetToInitial = useBoundStore.getState().resetToInitial;
  const addAlarm = useBoundStore.getState().addAlarm;
  const removeAlarm = useBoundStore.getState().removeAlarm;
  const isAlarmById = useBoundStore.getState().isAlarmById;
  const setAuthUser = useBoundStore.getState().setAuthUser;
  const setSocket = useBoundStore.getState().setSocket;
  const getUsers = useBoundStore.getState().getUsers;
  const getRooms = useBoundStore.getState().getRooms;
  const socketOpen = useBoundStore.getState().socketOpen;
  const socketClose = useBoundStore.getState().socketClose;

  return {
    setCurrentRoom,
    setMessages,
    addMessage,
    resetToInitial,
    addAlarm,
    removeAlarm,
    isAlarmById,
    setAuthUser,
    setSocket,
    getUsers,
    getRooms,
    socketClose,
    socketOpen,
  };
};
