import JsonFileManager from '../utils/jsonFileManager.js';

const fileName = 'room.json';
const fm = new JsonFileManager(fileName);

export const updateRoom = newData => fm.appendData(newData);

export const removeRoom = id => fm.removeDataById(id);

export const isRoomUnique = (key, value) => fm.isUnique(key, value);

export const getRoomById = id => fm.getDataById(id);

export const getJoinUsers = async id => {
  const room = await getRoomById(id);
  return room.users;
};
