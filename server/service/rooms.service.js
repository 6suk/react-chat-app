import JsonFileManager from '../utils/jsonFileManager.js';

const fileName = 'room.json';
const fm = new JsonFileManager(fileName);

export const getAllRooms = () => fm.readCachedData();

export const getUserRooms = async user_id => {
  const rooms = await fm.readCachedData();
  const rooms_arr = Object.values(rooms);

  return rooms_arr.filter(data => {
    const userSet = new Set(data.users);
    return userSet.has(user_id);
  });
};
