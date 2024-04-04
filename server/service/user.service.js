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
  await fm.updateFile(users => {
    const targetUserIndex = users.findIndex(user => user.id === id);
    users[targetUserIndex].rooms.push(roomId);
    return users;
  });
};

// 토근 생성 및 쿠키 세팅
export const setGenerateToken = ({ id, name }, res) => {
  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    maxAge: 1000 * 60 * 60 * 24 * 15,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  });
};
