import uuid from 'uuid4';

import { io } from '../socket/socket.js';

import { removeMessageByRoomId } from '../service/message.service.js';
import {
  getRoomById,
  isRoomUnique,
  removeRoom,
  updateRoom,
} from '../service/room.service.js';

import { formatAddUser } from '../utils/addUserUtils.js';
import { setAdminMessage } from '../utils/setAdminMessage.js';

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

export const createdRoom = async (req, res, next) => {
  try {
    const { title } = req.body;

    const { user } = req;
    const timestamp = Date.now();
    const id = uuid();

    const room = {
      id,
      title,
      created_user_id: user.id,
      users: [user.id],
      created_at: timestamp,
      updated_at: timestamp,
      messages: [],
    };

    // reponse formatting!
    const responseRoom = await formatAddUser(
      room,
      'created_user_id',
      'createdUser'
    );
    req.room = responseRoom;

    // set json data
    await updateRoom({ [id]: room });

    setAdminMessage({
      io,
      room,
      content: `${user.name}님이 [${room.title}] 방을 생성하셨습니다!`,
    });
    io.sockets.emit('new room', responseRoom);

    next();
  } catch (error) {
    console.log('🚨 CreatedRoom Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export const removedRoom = async (req, res) => {
  try {
    const targetRoomIds = req.body.rooms;

    const statusPromise = targetRoomIds.map(async id => {
      const isRoomUniqe = await isRoomUnique(id);
      if (isRoomUniqe) {
        return {
          id,
          ok: false,
          status: 401,
          message: '존재하지 않는 방입니다.',
        };
      }

      // created_user와 요청한 user가 같은지
      const room = await getRoomById(id);
      if (room.created_user_id !== req.user.id) {
        return {
          id,
          ok: false,
          status: 403,
          message: '해당 방의 삭제 권한이 없습니다!',
        };
      }

      // set json data
      await removeRoom(id); // room 삭제
      await removeMessageByRoomId(id); // 메세지 삭제
      return {
        id,
        ok: true,
        status: 200,
        message: '방이 삭제 되었습니다!',
      };
    });

    const status = await Promise.all(statusPromise);
    io.sockets.emit('removed room', targetRoomIds);
    const response = { ...(req.message || {}), rooms: status };
    res.status(200).json(response);
  } catch (error) {
    console.log('🚨 RemovedRoom Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export const joinRoom = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 방이 존재 하는지
    const isRoomUniqe = await isRoomUnique(id);
    if (isRoomUniqe) {
      res.status(401).json({ error: '존재하지 않는 방입니다.' });
      return;
    }

    const room = await getRoomById(id);

    if (!room.users.includes(req.user.id)) {
      // set json
      const updateUser = { ...room, users: [...room.users, req.user.id] };
      await updateRoom({ [id]: updateUser });
    }

    // room 정보 보내기
    req.room = room;
    next();
  } catch (error) {
    console.log('🚨 Join Room Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};
