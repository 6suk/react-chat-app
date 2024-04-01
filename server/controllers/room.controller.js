import uuid from 'uuid4';
import {
  getRoomById,
  isRoomUnique,
  removeRoom,
  updateRoom,
} from '../service/room.service.js';

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

export const createdRoom = async (req, res) => {
  try {
    const { title } = req.body;

    const currentUser = req.user;
    const timestamp = Date.now();

    const newRoom = {
      id: uuid(),
      title,
      created_user_id: currentUser.id,
      users: [currentUser.id],
      created_at: timestamp,
      updated_at: timestamp,
      messages: [],
    };

    // set json data
    await updateRoom(newRoom);
    res.status(200).json(newRoom);
  } catch (error) {
    console.log('🚨 CreatedRoom Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export const removedRoom = async (req, res) => {
  try {
    const { id } = req.params;

    // 방이 존재 하는지
    const isRoomUniqe = await isRoomUnique('id', id);

    if (isRoomUniqe)
      return res.status(401).json({ error: '존재하지 않는 방입니다.' });

    // created_user와 요청한 user가 같은지
    const room = await getRoomById(id);

    if (room.created_user_id !== req.user.id)
      return res.status(403).json({ error: '해당 방의 삭제 권한이 없습니다!' });

    // set json data
    await removeRoom(room.id);
    res.status(200).json({
      room,
      message: '방이 삭제 되었습니다!',
    });
  } catch (error) {
    console.log('🚨 RemovedRoom Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { id } = req.params;
    // 방이 존재 하는지
    const isRoomUniqe = await isRoomUnique('id', id);

    if (isRoomUniqe)
      return res.status(401).json({ error: '존재하지 않는 방입니다.' });

    const room = await getRoomById(id);
    const joinUsers = new Set(room.users);

    if (joinUsers.has(req.user.id)) {
      return res.status(200).json({
        isFirstJoin: false,
        room,
      });
    }

    room.users.push(req.user.id);
    res.status(200).json({
      isFirstJoin: true,
      room,
    });
  } catch (error) {
    console.log('🚨 enteredRoom Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};
