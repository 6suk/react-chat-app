import { getOtherUsers } from '../service/user.service.js';

export const otherUsersList = async (req, res) => {
  try {
    const currentUser = req.user;
    const otherUsers = await getOtherUsers(currentUser.id);
    res.status(200).json(otherUsers);
  } catch (error) {
    console.log('🚨 OtherUsersList Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};
