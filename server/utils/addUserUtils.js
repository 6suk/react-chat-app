import { getUserById } from '../service/user.service.js';

// user 정보 추가
export const formatAddUser = async (data, key, responseKey = null) => {
  if (data) {
    const getUser = await getUserById(data[key]);
    return { ...data, [responseKey || key]: getUser || noneUser };
  }
  return {};
};

// user 정보 추가 (array)
export const formatAddUsers = async (arr, key, responseKey = null) => {
  if (arr) {
    return await Promise.all(
      arr.map(async data => {
        return await formatAddUser(data, key, responseKey);
      })
    );
  }
  return [];
};

// 기존 obj >>> array
export const convertObjToArr = obj => Object.keys(obj).map(key => obj[key]);

const noneUser = {
  id: 'none',
  name: '(알 수 없음)',
  profile:
    'https://avatar.iran.liara.run/username?username=?&background=dcdcdc&color=333333',
  rooms: [],
  createdRooms: [],
};
