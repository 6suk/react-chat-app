import { getUserRooms } from '../service/rooms.service.js';
import { getAllRooms } from '../service/rooms.service.js';

/**
 *  [
 *    {
 *      id : UUID, (uni)
 *      title : string
 *      created_user_id : user_id
 *      created_at : timestamp
 *      updated_at : timestamp
 *      users : user_id array
 *      messages : message_id array
 *    }
 *  ]
 */

export const getRooms = async (req, res) => {
  try {
    const data = await getAllRooms();
    const dataArray = Object.keys(data).map(key => data[key]);

    res.status(200).json({ rooms: dataArray });
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
  } catch (error) {}

  try {
  } catch (error) {
    console.log('🚨 GetRoomsByUser Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};
