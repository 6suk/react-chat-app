import jwt from 'jsonwebtoken';
import JsonFileManager from '../utils/jsonFileManager.js';

const fileName = 'user.json';
const fm = new JsonFileManager(fileName);

export const getUserById = async id => {
  const users = await fm.readCachedData();
  return users.find(user => user.id === id);
};

export const updateUser = async newData => {
  await fm.updateFile(users => {
    return [...users, newData];
  });
};

export const removeUser = async id => {
  await fm.updateFile(users => {
    return users.filter(user => user.id !== id);
  });
};

export const isUserNameUnique = async (key, value) => {
  const users = await fm.readCachedData();
  // 데이터 O : 'false'
  // 데이터 X : 'true'
  return !users.some(user => user[key] === value);
};

export const filterUserById = async id => {
  const users = await fm.readCachedData();
  return users.filter(data => data.id !== id);
};

// Join 시 User Data Rooms 추가
export const setUserRooms = async (id, roomId) => {
  const updateUser = user => {
    if (user.id === id)
      return {
        ...user,
        rooms: [...user.rooms, roomId],
      };
    return user;
  };

  await fm.updateFile(users => {
    const updateUsers = users.map(user => {
      return updateUser(user);
    });
    return updateUsers;
  });
};

export const setCreatedRoom = async (id, roomId) => {
  const updateUser = user => {
    if (user.id === id) {
      return {
        ...user,
        createdRooms: [...(user.createdRooms || []), roomId],
      };
    }
    return user;
  };

  await fm.updateFile(users => {
    const updateUsers = users.map(user => {
      return updateUser(user);
    });
    return updateUsers;
  });
};

// 토근 생성 및 쿠키 세팅
export const setGenerateToken = ({ id, name }, res) => {
  const maxAge_15d = 1000 * 60 * 60 * 24 * 15; // 15일
  const maxAge = 1000 * 10; // 10초

  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: maxAge_15d,
  });

  res.cookie('jwt', token, {
    maxAge: maxAge_15d,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });
};
