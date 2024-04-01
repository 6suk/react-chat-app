import JsonFileManager from '../utils/jsonFileManager.js';

const fileName = 'message.json';
const fm = new JsonFileManager(fileName);

export const updateMessage = async newData => {
  const id = newData.room;

  await fm.updateFile(existingData => {
    const appendData = {
      [id]: [newData],
    };

    const findMessagesByRoom = existingData[id];

    if (!findMessagesByRoom) {
      return { ...existingData, ...appendData };
    }

    findMessagesByRoom.push(newData);
    return existingData;
  });
};

export const getMessagesByRoomId = async roomId => {
  const messages = await fm.readCachedData();
  return messages[roomId];
};
