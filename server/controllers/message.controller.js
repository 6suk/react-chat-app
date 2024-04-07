import uuid4 from 'uuid4';
import { io } from '../socket/socket.js';
import {
  getMessagesByRoomId,
  updateMessage,
} from '../service/message.service.js';
import { formatAddUser, formatAddUsers } from '../utils/addUserUtils.js';
import { getRoomById } from '../service/room.service.js';

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
    // const room = req.room;
    const { id } = req.params;
    const room = await getRoomById(id);
    const newMessage = {
      id: uuid4(),
      room: id,
      from: req.user.id,
      to: room.users,
      created_at: Date.now(),
      content: req.body.content,
    };

    // set json
    await updateMessage(newMessage);

    // response formatting!
    const responseMessage = await formatAddUser(newMessage, 'from');
    io.to(room.id).emit('message', responseMessage);
    res.status(200).json({
      message: responseMessage,
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
    const { room } = req;

    const messages = await getMessagesByRoomId(id);
    let responseMessages = [];

    // response formatting!
    if (messages) {
      responseMessages = await formatAddUsers(messages, 'from');
    }

    res.status(200).json({ room, messages: responseMessages });
  } catch (error) {
    console.log('🚨 getMessages Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};
