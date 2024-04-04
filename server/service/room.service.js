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

export const getAllRooms = async () => await fm.readCachedData();

export const getUserRooms = async user_id => {
  const rooms = await fm.readCachedData();
  const rooms_arr = Object.values(rooms);

  return rooms_arr.filter(data => {
    const userSet = new Set(data.users);
    return userSet.has(user_id);
  });
};
