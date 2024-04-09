import uuid from 'uuid4';

import { updateMessage } from '../service/message.service.js';
import { getUserById, updateUser } from '../service/user.service.js';

export const ADMIN = {
  id: 'admin',
  name: '관리자',
  gender: 'male',
  profile: 'https://avatar.iran.liara.run/public/boy?username=admin',
  rooms: [],
};

export const setAdminMessage = async ({ io, room, content, userId = null }) => {
  // admin 계정이 없을 경우 생성
  const admin = await getUserById('admin');
  if (!admin) await updateUser(ADMIN);

  const message = {
    id: uuid(),
    room: room.id,
    from: 'admin',
    to: userId ? [...room.users, userId] : room.users,
    created_at: Date.now(),
    content,
  };

  await updateMessage(message);
  io.to(room.id).emit('message', { ...message, from: admin });
  return message;
};
