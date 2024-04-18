import jwt from 'jsonwebtoken';

import JsonFileManager from '../utils/jsonFileManager.js';

import env from '../env.config.js';

import { initialUserData } from './initialData.js';

const fileName = './data/user.json';
const fm = new JsonFileManager(fileName, initialUserData || []);

export const getUserById = async id => {
  const users = await fm.readCachedData();
  return users.find(user => user.id === id);
};

export const updateUser = async newData => {
  await fm.updateFile(users => [...users, newData]);
};

export const removeUser = async id => {
  await fm.updateFile(users => users.filter(user => user.id !== id));
};

export const removeUserRoom = async (userId, roomId) => {
  await fm.updateFile(users => {
    const usersMap = users.map(user => {
      if (user.id === 'admin') return user;

      const isRooms = user.rooms.includes(roomId);
      const isCreatedRoom = user.createdRooms.includes(roomId);
      const copyUser = user;
      if (isRooms) {
        copyUser.rooms = user.rooms.filter(id => id !== roomId);
      }
      if (isCreatedRoom) {
        copyUser.createdRooms = user.createdRooms.filter(id => id !== roomId);
      }
      return copyUser;
    });

    return usersMap;
  });
};

export const isUserUniqueByKey = async (key, value) => {
  const users = await fm.readCachedData();
  // 데이터 O : 'false'
  // 데이터 X : 'true'
  return !users.some(user => user[key] === value);
};

export const filterUserById = async id => {
  const users = await fm.readCachedData();
  return users.filter(data => data.id !== id && data.id !== 'admin');
};

// Join 시 User Data Rooms 추가
export const setUserRooms = async (id, roomId) => {
  const updateUserRooms = user => {
    if (user.id === id)
      return {
        ...user,
        rooms: [...user.rooms, roomId],
      };
    return user;
  };

  await fm.updateFile(users => {
    const updateUsers = users.map(user => updateUserRooms(user));
    return updateUsers;
  });
};

export const setCreatedRoom = async (id, roomId) => {
  const updateUserCreatedRoom = user => {
    if (user.id === id) {
      return {
        ...user,
        createdRooms: [...(user.createdRooms || []), roomId],
      };
    }
    return user;
  };

  await fm.updateFile(users => {
    const updateUsers = users.map(user => updateUserCreatedRoom(user));
    return updateUsers;
  });
};

// 토근 생성 및 쿠키 세팅
export const setGenerateToken = ({ id, name }, res) => {
  const maxAge = 1000 * 60 * 60 * 24 * 15; // 15일

  const token = jwt.sign({ id, name }, env.jwtKey, {
    expiresIn: maxAge,
  });

  res.cookie('jwt', token, {
    maxAge,
    httpOnly: true,
    sameSite: 'strict',
    secure: env.nodeENV !== 'development',
  });

  return token;
};
