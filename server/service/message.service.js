import JsonFileManager from '../utils/jsonFileManager.js';

const fileName = 'message.json';
const fm = new JsonFileManager(fileName);

export const updateMessage = async message => {
  const roomId = message.room;

  await fm.updateFile(messages => {
    const messagesByRoomId = messages[roomId];

    const updateMessages = {
      ...messages,
      [roomId]: [...(messagesByRoomId || []), message],
    };

    return updateMessages;
  });
};

export const getMessagesByRoomId = async roomId => {
  const messages = await fm.readCachedData();
  return messages[roomId];
};

export const removeMessageByRoomId = async roomId => {
  await fm.updateFile(messages => {
    const updateMessages = { ...messages };
    delete updateMessages[roomId];
    return updateMessages;
  });
};
