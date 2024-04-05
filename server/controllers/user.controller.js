import {
  filterUserById,
  getUserById,
  setUserRooms,
} from '../service/user.service.js';

export const otherUsersList = async (req, res) => {
  try {
    const currentUser = req.user;
    const otherUsers = await filterUserById(currentUser.id);
    res.status(200).json(otherUsers);
  } catch (error) {
    console.log('🚨 OtherUsersList Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export const userJoinRoom = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    const isJoinedRoom = user.rooms.includes(req.room.id);
    if (!isJoinedRoom) await setUserRooms(req.user.id, req.room.id);
    next();
  } catch (error) {
    console.log('🚨 userJoinRoom Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export const userCreateRoom = async (req, res) => {
  try {
    if (req.room) {
      const user = await getUserById(req.user.id);
      const isJoinedRoom = user.rooms.includes(req.room.id);
      if (!isJoinedRoom) await setUserRooms(req.user.id, req.room.id);

      res.status(200).json(req.room);
    }
  } catch (error) {
    console.log('🚨 userCreateRoom Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};
