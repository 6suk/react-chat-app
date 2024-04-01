import {
  getMessagesByRoomId,
  updateMessage,
} from '../service/message.service.js';
import { getJoinUsers } from '../service/room.service.js';

/**
 *  room_id {
 *    [ 
 *      {
 *        room_id : room_id
 *        from : user_id
 *        to : user_id array
 *        content : string
 *        created_at : timeStamp
 *        room : room_id
 *      }
 *    ],
 *  }

 */

export const sendMessage = async (req, res) => {
  try {
    const { id: roomId } = req.params;
    const joinUsers = await getJoinUsers(roomId);
    const joinUsersSet = new Set(joinUsers);
    const userId = req.user.id;

    if (!joinUsersSet.has(userId)) {
      return res.status(401).json({ error: '방에 입장하지 않은 유저입니다.' });
    }

    const newMessage = {
      room: roomId,
      from: req.user.id,
      to: joinUsers,
      created_at: Date.now(),
      content: req.body.content,
    };

    await updateMessage(newMessage);
    res.status(200).json({
      msg: newMessage,
    });
  } catch (error) {
    console.log('🚨 sendMessage Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await getMessagesByRoomId(id);

    res.status(200).json(messages);
  } catch (error) {
    console.log('🚨 getMessages Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};
