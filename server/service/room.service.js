import { jsonUpdate } from '../utils/jsonFileManager.js';

const fileName = 'room.json';

export const updateRoom = async newData => jsonUpdate({ fileName, newData });
