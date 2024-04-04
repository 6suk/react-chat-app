import { filterUserById, setUserRooms } from '../service/user.service.js';

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
  if (req.isFirstJoin) await setUserRooms(req.user.id, req.room.id);
  next();
};
