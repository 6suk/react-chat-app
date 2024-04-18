import uuid from 'uuid4';

import { updateMessage } from '../service/message.service.js';
import { updateUser, isUserUniqueByKey } from '../service/user.service.js';

export const ADMIN = {
  id: 'admin',
  name: '관리자',
  gender: 'male',
  profile: 'https://avatar.iran.liara.run/public/boy?username=admin',
  rooms: [],
};

export const setAdminMessage = async ({ io, room, content }) => {
  // admin 계정이 없을 경우 생성
  const noneAdmin = await isUserUniqueByKey('id', 'admin');
  if (noneAdmin) await updateUser(ADMIN);

  const message = {
    id: uuid(),
    room: room.id,
    from: 'admin',
    to: room.users,
    created_at: Date.now(),
    content,
  };

  await updateMessage(message);
  io.to(room.id).emit('message', { ...message, from: ADMIN });
  return message;
};
