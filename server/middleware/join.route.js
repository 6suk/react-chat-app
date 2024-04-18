import { io, socketJoin } from '../socket/socket.js';

import {
  getRoomById,
  isRoomUnique,
  updateRoom,
} from '../service/room.service.js';
import { setUserRooms } from '../service/user.service.js';

import { setAdminMessage } from '../utils/setAdminMessage.js';

const joinRoute = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;

    // 방이 존재 하는지
    const isRoomUniqe = await isRoomUnique(id);
    if (isRoomUniqe) {
      return res.status(404).json({ error: '존재하지 않는 방입니다.' });
    }

    const room = await getRoomById(id);
    const isJoined = room.users.includes(user.id);

    // 첫 입장
    if (!isJoined) {
      const users = [...room.users, user.id];

      // set json
      const updateRoomToUsers = {
        ...room,
        users,
      };
      await updateRoom({ [id]: updateRoomToUsers });
      await setUserRooms(user.id, id);

      // socket
      await socketJoin({ userId: user.id, roomId: id });
      io.emit('new join', { id, joinedUsers: users });
      await setAdminMessage({
        io,
        room: updateRoomToUsers,
        content: `${user.name}님이 입장하셨습니다!`,
      });

      console.log(
        `💡 new Join! : [${user.name}]님이 [${room.title}]방에 입장하셨습니다`
      );

      // 변경된 room 정보 보내기
      req.room = updateRoomToUsers;
      return next();
    }

    // room 정보 보내기
    req.room = room;
    return next();
  } catch (error) {
    console.log('🚨 Join Room Controller Error! : ', error);
    return res.status(500).json({
      error: 'Server Error!',
    });
  }
};

export default joinRoute;
