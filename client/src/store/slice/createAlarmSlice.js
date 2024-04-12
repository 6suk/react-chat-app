import { produce } from 'immer';
import { toast } from 'react-hot-toast';

export const alarmInit = {
  alarms: [], // roomId Array
};

export const createAlarmSlice = (set, get) => ({
  ...alarmInit,
  addAlarm: id =>
    set(
      produce(state => {
        if (!get().alarms.includes(id)) state.alarms.push(id);
      })
    ),
  removeAlarm: removeId =>
    set(
      produce(state => {
        state.alarms = state.alarms.filter(id => id !== removeId);
      })
    ),

  setMessageAlarm: (room, message) => {
    toast(
      `🔔\n'${room.title}' 방에 알림이 왔어요!\n\n${message.from.name} : ${message.content}`,
      {
        style: {
          textAlign: 'center',
        },
      }
    );
  },
});
