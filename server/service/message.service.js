import JsonFileManager from '../utils/jsonFileManager.js';

const fileName = 'message.json';
const fm = new JsonFileManager(fileName);

export const updateMessage = async message => {
  const roomId = message.room;

  await fm.updateFile(messages => {
    const newMessage = {
      [roomId]: [message],
    };

    const messagesByRoomId = messages[roomId];

    if (!messagesByRoomId) {
      return { ...messages, ...newMessage };
    }

    messagesByRoomId.push(message);
    return messages;
  });
};

export const getMessagesByRoomId = async roomId => {
  const roomsMessages = await fm.readCachedData();
  return roomsMessages[roomId];
};
