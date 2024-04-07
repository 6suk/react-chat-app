import jwt from 'jsonwebtoken';
import JsonFileManager from '../utils/jsonFileManager.js';

const fileName = 'user.json';
const fm = new JsonFileManager(fileName);

export const getUserById = id => fm.getDataById(id);

export const updateUser = newData => fm.appendData(newData);

export const removeUser = id => fm.removeDataById(id);

export const isUserNameUnique = (key, value) => fm.isUnique(key, value);

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

export const setAdmin = async () => {
  const admin = {
    id: 'admin',
    name: '관리자',
    gender: 'male',
    profile: 'https://avatar.iran.liara.run/public/boy?username=admin',
    rooms: [],
  };

  await fm.appendData(admin);
};
