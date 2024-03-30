import uuid from 'uuid4';
import { updateRoom } from '../service/room.service.js';

/**
 *  [
 *    {
 *      id : UUID, (uni)
 *      title : string
 *      created_user : user_name
 *      created_at : timestamp
 *      updated_at : timestamp
 *      users : user_id array
 *      messages : message_id array
 *    }
 *  ]
 */

export const createdRoom = async (req, res) => {
  try {
    const { title } = req.body;

    const currentUser = req.user;
    const timestamp = Date.now();

    const newRoom = {
      id: uuid(),
      title,
      created_user: currentUser.name,
      created_at: timestamp,
      updated_at: timestamp,
      messages: [],
    };

    // ser json data
    await updateRoom(newRoom);
    res.status(200).json(newRoom);
  } catch (error) {
    console.log('🚨 CreatedRoom Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};
