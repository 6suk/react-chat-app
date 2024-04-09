import uuid4 from 'uuid4';

import {
  getUserById,
  isUserNameUnique,
  removeUser,
  setGenerateToken,
  updateUser,
} from '../service/user.service.js';

/**
 *  [
 *    {
 *      id : UUID, (uni)
 *      name : string (uni)
 *      gender : enum ('male', 'female')
 *      profile : string
 *      rooms : number array
 *    }
 *  ]
 */

// SingUp and Login
export const login = async (req, res) => {
  try {
    const { name, gender } = req.body;
    if (!name || !gender) {
      res.status(400).json({ error: '닉네임 및 성별은 필수 항목입니다!' });
      return;
    }

    const isUnique = await isUserNameUnique('name', name);

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

    // set jwt token
    setGenerateToken({ id: newUser.id, name: newUser.name }, res);
    // set json data
    updateUser(newUser);

    res.status(200).json({
      id: newUser.id,
      name: newUser.name,
      gender: newUser.gender,
      profile: newUser.profile,
    });
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
    const user = await getUserById(req.user.id);
    req.body.rooms = user.createdRooms;

    // set json data
    await removeUser(req.user.id);
    res.cookie('jwt', '', { maxAge: 0 });

    req.message = {
      logout: {
        userId: user.id,
        status: 200,
        message: '로그아웃이 완료 되었습니다!',
      },
    };
    next();
  } catch (error) {
    console.log('🚨 logout Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { id, name } = req.body.user;
    const getUser = await getUserById(id);

    // DB에 user 정보가 없을 경우
    if (!getUser || getUser?.name !== name) {
      res.status(401).json({
        error: '존재하지 않는 유저입니다.',
      });
      return;
    }
    setGenerateToken({ id, name }, res);
    res.status(200).json({ user: req.body.user });
  } catch (error) {
    console.log('🚨 refreshToken Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};
