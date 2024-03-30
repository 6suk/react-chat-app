import jwt from 'jsonwebtoken';

import userData from '../data/user.json' assert { type: 'json' };

import { jsonRemove, jsonUpdate } from '../utils/jsonFileManager.js';

const fileName = 'user.json';

export const getAllUsers = () => userData;

export const getOtherUsers = id => userData.filter(user => user.id !== id);

export const getUserById = id => userData.filter(user => user.id === id)[0];

export const updateUser = async newData => jsonUpdate({ fileName, newData });

export const removeUser = async newData => jsonRemove({ fileName, newData });

// 닉네임 중복검사
export const isValidUserName = name => {
  const nameSet = new Set(userData.map(user => user.name));
  return !nameSet.has(name);
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
