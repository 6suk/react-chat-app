import { getOtherUsers } from '../service/user.service.js';

export const otherUsersList = (req, res) => {
  try {
    const currentUser = req.user;
    const otherUsers = getOtherUsers(currentUser.id);
    res.status(200).json(otherUsers);
  } catch (error) {
    console.log('🚨 login Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};
