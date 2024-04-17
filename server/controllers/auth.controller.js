import uuid4 from 'uuid4';

import { io } from '../socket/socket.js';

import {
  getUserById,
  isUserUniqueByKey,
  removeUser,
  setGenerateToken,
  updateUser,
} from '../service/user.service.js';

// SingUp and Login
export const login = async (req, res) => {
  try {
    const { name, gender } = req.body;
    if (!name || !gender) {
      res.status(400).json({ error: '닉네임 및 성별은 필수 항목입니다!' });
      return;
    }

    const isUnique = await isUserUniqueByKey('name', name);
    if (!isUnique) {
      res.status(400).json({ error: '중복된 닉네임입니다!' });
      return;
    }

    const id = uuid4();
    const newUser = {
      id,
      name,
      gender,
      profile: `https://avatar.iran.liara.run/public/${
        gender === 'male' ? 'boy' : 'girl'
      }?username=${id}`,
      rooms: [],
      createdRooms: [],
    };

    const reponseUser = { id, name, gender, profile: newUser.profile };

    // set jwt token
    setGenerateToken({ id: newUser.id, name: newUser.name }, res);
    // set json data
    await updateUser(newUser);

    io.sockets.emit('new user', reponseUser);
    res.status(200).json({ user: reponseUser });
  } catch (error) {
    console.log('🚨 Auth Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

// Removed user and LogOut
export const logout = async (req, res, next) => {
  try {
    const { id, createdRooms } = req.user;
    req.body.rooms = createdRooms; // roomIds to remove

    // set json data
    await removeUser(id);
    res.cookie('jwt', '', { maxAge: 0 });
    io.sockets.emit('removed user', id);

    req.logout = {
      logout: {
        userId: id,
        status: 200,
        message: '로그아웃이 완료 되었습니다!',
      },
    };
    next(); // removeRooms()
  } catch (error) {
    console.log('🚨 logout Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { id, name, gender } = req.body;
    const getUser = await getUserById(id);

    // DB에 user 정보가 없을 경우
    if (!getUser || getUser?.name !== name || getUser?.gender !== gender) {
      res.status(403).json({
        error: '존재하지 않는 유저입니다.',
      });
      return;
    }
    setGenerateToken({ id, name }, res);
    res
      .status(200)
      .json({ message: '토큰이 갱신 되었습니다.', user: req.body });
  } catch (error) {
    console.log('🚨 refreshToken Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};
