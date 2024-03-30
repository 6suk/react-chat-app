import {
  jsonGetOneById,
  jsonGetOthersById,
  jsonRemove,
  jsonUpdate,
} from '../utils/jsonFileManager.js';

const fileName = 'room.json';

export const updateRoom = async newData => jsonUpdate({ fileName, newData });
export const removeRoom = async newData => jsonRemove({ fileName, newData });
export const getOtherRooms = async id => jsonGetOthersById({ fileName, id });
export const getRoomById = async id => jsonGetOneById({ fileName, id });
