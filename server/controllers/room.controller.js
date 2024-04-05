import uuid from 'uuid4';
import {
  getRoomById,
  isRoomUnique,
  removeRoom,
  updateRoom,
} from '../service/room.service.js';
import { io } from '../socket/socket.js';
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

    const user = req.user;
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

    // socket - send admin message
    setAdminMessage(
      room,
      `${user.name}님이 [${room.title}] 방을 생성하셨습니다!`
    );
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
    const { id } = req.params;

    // 방이 존재 하는지
    const isRoomUniqe = await isRoomUnique(id);

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

export const joinRoom = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 방이 존재 하는지
    const isRoomUniqe = await isRoomUnique(id);
    if (isRoomUniqe)
      return res.status(401).json({ error: '존재하지 않는 방입니다.' });

    const room = await getRoomById(id);
    const joinUsers = new Set(room.users);

    if (joinUsers.has(req.user.id)) {
      req.isFirstJoin = false;
    } else {
      req.isFirstJoin = true;

      // set json
      room.users.push(req.user.id);
      await updateRoom({ [id]: room });
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

// export const joinRoom = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // 방이 존재 하는지
//     const isRoomUniqe = await isRoomUnique(id);

//     if (isRoomUniqe)
//       return res.status(401).json({ error: '존재하지 않는 방입니다.' });

//     const room = await getRoomById(id);
//     const joinUsers = new Set(room.users);

//     if (joinUsers.has(req.user.id)) {
//       return res.status(200).json({
//         isFirstJoin: false,
//         room,
//       });
//     }

//     room.users.push(req.user.id);
//     console.log(room);

//     // set json
//     await updateRoom({ [id]: room });

//     // 첫 입장 시 메세지 보내기
//     io.to(id).emit('sendMessage', `${req.user.name}님이 입장하셨습니다!`);
//     res.status(200).json({
//       isFirstJoin: true,
//       room,
//     });
//   } catch (error) {
//     console.log('🚨 Join Room Controller Error! : ', error);
//     res.status(500).json({
//       error: 'Server Error!',
//     });
//   }
// };
