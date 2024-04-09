import { filterUserById } from '../service/user.service.js';

const getOtherUsers = async (req, res) => {
  try {
    const { id } = req.user;
    const users = await filterUserById(id);
    res.status(200).json({ users });
  } catch (error) {
    console.log('🚨 getOtherUsers Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export default getOtherUsers;
