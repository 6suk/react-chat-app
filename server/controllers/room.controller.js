import uuid from 'uuid4';

import { io } from '../socket/socket.js';

import { removeMessageByRoomId } from '../service/message.service.js';
import {
  getRoomRemovalStatus,
  removeRoom,
  updateRoom,
} from '../service/room.service.js';
import { setCreatedRoom, setUserRooms } from '../service/user.service.js';

import { formatAddUser } from '../utils/addUserUtils.js';
import { setAdminMessage } from '../utils/setAdminMessage.js';

export const createRoom = async (req, res) => {
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

    // set json data
    await updateRoom({ [id]: room });
    await setUserRooms(user.id, id); // 참여 중인 방
    await setCreatedRoom(user.id, id); // 생성한 방

    // reponse formatting!
    const responseRoom = await formatAddUser(
      room,
      'created_user_id',
      'createdUser'
    );

    // socket
    io.sockets.emit('new room', responseRoom);
    await setAdminMessage({
      io,
      room,
      content: `${user.name}님이 [${room.title}] 방을 생성하셨습니다!`,
    });
    res.status(200).json(responseRoom);
  } catch (error) {
    console.log('🚨 CreatedRoom Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export const removeRooms = async (req, res) => {
  try {
    const roomIds = req.body.rooms; // roomIds to remove
    const userId = req.user.id;

    // romove Room & Messages
    const statusArray = await roomIds.reduce(async (prevPromise, id) => {
      await prevPromise;
      const status = await getRoomRemovalStatus(id, userId);

      if (status.ok) {
        await removeRoom(id); // room 삭제
        await removeMessageByRoomId(id); // 삭제되는 방의 메세지 전부 삭제
      }

      return [...(await prevPromise), status];
    }, []);

    // socket
    io.sockets.emit('removed room', roomIds);
    const response = { ...(req.message || {}), rooms: statusArray };
    res.status(200).json(response);
  } catch (error) {
    console.log('🚨 RemovedRoom Controller Error! : ', error);
    res.status(500).json({
      error: 'Server Error!',
    });
  }
};
