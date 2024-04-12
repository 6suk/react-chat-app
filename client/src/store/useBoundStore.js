import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { alarmInit, createAlarmSlice } from '@store/slice/createAlarmSlice';
import { authInit, createAuthSlice } from '@store/slice/createAuthSlice';
import {
  createCurrentRoomSlice,
  currentRoomInit,
} from '@store/slice/createCurrentRoomSlice';
import { createRoomsSlice, roomsInit } from '@store/slice/createRoomsSlice';
import { createSocketSlice, socketInit } from '@store/slice/createSocketSlice';
import { createUsersSlice, usersInit } from '@store/slice/createUsersSlice';

const resetToInitial = set => ({
  resetToInitial: () =>
    set({
      ...currentRoomInit,
      ...alarmInit,
      ...authInit,
      ...socketInit,
      ...roomsInit,
      ...usersInit,
    }),
});

export const useBoundStore = create(
  devtools(
    subscribeWithSelector(
      immer(
        persist(
          (...a) => ({
            ...createCurrentRoomSlice(...a),
            ...createAlarmSlice(...a),
            ...createAuthSlice(...a),
            ...createSocketSlice(...a),
            ...createRoomsSlice(...a),
            ...createUsersSlice(...a),
            ...resetToInitial(...a),
          }),
          {
            name: 'store',
            partialize: state => ({
              alarms: state.alarms,
              authUser: state.authUser,
            }),
          }
        )
      )
    ),
    {
      name: 'store',
    }
  )
);
