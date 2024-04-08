import JsonFileManager from '../utils/jsonFileManager.js';

const fileName = 'room.json';
const fm = new JsonFileManager(fileName);

export const updateRoom = async newData => {
  await fm.updateFile(existingData => ({ ...existingData, ...newData }));
};

export const removeRoom = async id => {
  await fm.updateFile(existingData => {
    const updateRooms = { ...existingData };
    delete updateRooms[id];
    return updateRooms;
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

export const getAllRooms = async () => fm.readCachedData();

export const getUserRooms = async userId => {
  const rooms = await fm.readCachedData();
  const roomsValue = Object.values(rooms);

  return roomsValue.filter(data => data.users.includes(userId));
};
