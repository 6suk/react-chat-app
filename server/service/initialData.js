export const initialRoomData = {
  'example-room-01': {
    id: 'example-room-01',
    title: '채팅방1',
    created_user_id: 'example-user-01',
    users: ['example-user-01', 'example-user-02'],
    created_at: 1713422100739,
  },
  'example-room-02': {
    id: 'example-room-02',
    title: '채팅방2',
    created_user_id: 'example-user-01',
    users: ['example-user-01'],
    created_at: 1713422100739,
  },
};

export const initialUserData = [
  {
    id: 'example-user-01',
    name: '기존유저1',
    gender: 'female',
    profile:
      'https://avatar.iran.liara.run/public/girl?username=example-user-01',
    rooms: ['example-room-01', 'example-room-02'],
    createdRooms: ['example-room-01', 'example-room-02'],
  },
  {
    id: 'example-user-02',
    name: '기존유저2',
    gender: 'male',
    profile:
      'https://avatar.iran.liara.run/public/boy?username=example-user-02',
    rooms: ['example-room-01'],
    createdRooms: [],
  },
];

export const initialMessageData = {};
