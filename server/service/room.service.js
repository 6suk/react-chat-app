import JsonFileManager from '../utils/jsonFileManager.js';

import { initialRoomData } from './initialData.js';

const fileName = './data/room.json';
const fm = new JsonFileManager(fileName, initialRoomData || {});

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

export const getRoomRemovalStatus = async (roomId, userId) => {
  const isRoomUniqe = await isRoomUnique(roomId);
  if (isRoomUniqe) {
    return {
      id: roomId,
      ok: false,
      status: 404,
      message: '존재하지 않는 방입니다.',
    };
  }

  // created_user와 요청한 user가 같은지
  const room = await getRoomById(roomId);
  if (room.created_user_id !== userId) {
    return {
      id: roomId,
      ok: false,
      status: 403,
      message: '해당 방의 삭제 권한이 없습니다!',
    };
  }

  return {
    id: roomId,
    ok: true,
    status: 200,
    message: '방이 삭제 되었습니다!',
  };
};
