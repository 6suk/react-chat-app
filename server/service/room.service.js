import JsonFileManager from '../utils/jsonFileManager.js';

const fileName = 'room.json';
const fm = new JsonFileManager(fileName);

export const updateRoom = async newData => {
  await fm.updateFile(existingData => {
    return { ...existingData, ...newData };
  });
};

export const removeRoom = async id => {
  await fm.updateFile(existingData => {
    delete existingData[id];
    return existingData;
  });
};

export const isRoomUnique = async id => {
  const rooms = await fm.readCachedData();
  return rooms[id] === undefined || rooms[id] === null;
};

export const getRoomById = async id => {
  const rooms = await fm.readCachedData();
  return rooms[id];
};

export const getJoinUsers = async id => {
  const room = await getRoomById(id);
  return room.users;
};
