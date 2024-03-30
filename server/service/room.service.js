import { jsonRemove, jsonUpdate } from '../utils/jsonFileManager.js';

const fileName = 'room.json';

export const updateRoom = async newData => jsonUpdate({ fileName, newData });
export const removeRoom = async newData => jsonRemove({ fileName, newData });
