import { getUserById } from '../service/user.service.js';

export const noneUser = {
  id: 'none',
  name: '(알 수 없음)',
  profile:
    'https://avatar.iran.liara.run/username?username=?&background=dcdcdc&color=333333',
  rooms: [],
  createdRooms: [],
};

// user 정보 추가
export const formatAddUser = async (data, key, responseKey = null) => {
  if (data) {
    const { [key]: removedKey, ...rest } = data;
    const getUser = await getUserById(data[key]);
    return { ...rest, [responseKey || key]: getUser || noneUser };
  }
  return {};
};

// user 정보 추가 (array)
export const formatAddUsers = async (arr, key, responseKey = null) => {
  if (arr) {
    return Promise.all(
      arr.map(async data => formatAddUser(data, key, responseKey))
    );
  }
  return [];
};
