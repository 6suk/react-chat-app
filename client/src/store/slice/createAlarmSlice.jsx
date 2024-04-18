import { produce } from 'immer';
import { toast } from 'react-hot-toast';

import AlarmToast from '@components/Common/AlarmToast';

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

  toastAlarm: (room, message) => {
    toast.custom(t => <AlarmToast room={room} message={message} t={t} />);
  },
});
