import uuid from 'uuid4';

import { updateMessage } from '../service/message.service.js';
import { getUserById, updateUser } from '../service/user.service.js';
import { io } from '../socket/socket.js';

export const setAdminMessage = async (sendRoom, content) => {
  // admin 계정이 없을 경우 생성
  const admin = await getUserById('admin');
  if (!admin) await updateUser(ADMIN);

  const message = {
    id: uuid(),
    room: sendRoom.id,
    from: 'admin',
    to: sendRoom.users,
    created_at: Date.now(),
    content,
  };

  await updateMessage(message);
  io.to(sendRoom.id).emit('message', { ...message, from: admin });
  return message;
};

const ADMIN = {
  id: 'admin',
  name: '관리자',
  gender: 'male',
  profile: 'https://avatar.iran.liara.run/public/boy?username=admin',
  rooms: [],
};
