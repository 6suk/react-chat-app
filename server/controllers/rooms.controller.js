import { getAllRooms, getUserRooms } from '../service/room.service.js';

import { formatAddUsers } from '../utils/addUserUtils.js';

export const getRooms = async (req, res) => {
  try {
    const roomsObj = await getAllRooms();
    const rooms = Object.keys(roomsObj).map(key => roomsObj[key]);

    // response formatting!
    let responseRooms = [];
    if (rooms) {
      responseRooms = await formatAddUsers(
        rooms,
        'created_user_id',
        'createdUser'
      );
    }

    res.status(200).json({ rooms: responseRooms });
  } catch (error) {
    console.log('🚨 GetAllRooms Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export const getRoomsByUser = async (req, res) => {
  try {
    const rooms = await getUserRooms(req.user.id);
    res.status(200).json({ rooms });
  } catch (error) {
    console.log('🚨 GetRoomsByUser Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};
