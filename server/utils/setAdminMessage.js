import uuid from 'uuid4';

import { io } from '../socket/socket.js';
import { updateMessage } from '../service/message.service.js';
import { getUserById, setAdmin } from '../service/user.service.js';

export const setAdminMessage = async (sendRoom, content) => {
  // admin 계정이 없을 경우 생성
  const admin = await getUserById('admin');
  if (!admin) {
    await setAdmin();
  }

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
