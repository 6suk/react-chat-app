import { useEffect, useRef } from 'react';

import { getActions, useAuthUser } from '@store/index';
import { useBoundStore } from '@store/useBoundStore';

import Divider from '@components/Common/Divider';

import { toggleClass } from '@utils/toggleClass';

const Room = ({ room, isLast }) => {
  const alarmRef = useRef();
  const liRef = useRef();

  const authUser = useAuthUser();
  const { id, title, users, createdUser } = room;
  const { setCurrentRoom, removeAlarm } = getActions();

  const isJoined = users.includes(authUser.id);
  const isHost = createdUser.id === authUser.id;

  // 알림 시 불필요한 재랜더링 막기
  useEffect(() => {
    const unsub = useBoundStore.subscribe(
      state => [state.alarms, state.currentRoom],
      ([alarms, currentRoom]) => {
        const alarmRefCurrent = alarmRef.current;
        toggleClass(alarmRefCurrent, 'hidden', !alarms.includes(room.id));

        const liRefCurrent = liRef.current;
        const isCurrent = currentRoom?.id === room.id;
        toggleClass(liRefCurrent, 'bg-primary-content', isCurrent);
        scrollToRoom(liRefCurrent, isCurrent);
      },
      {
        fireImmediately: true,
      }
    );

    return unsub;
  }, []);

  const scrollToRoom = (element, condition) => {
    if (condition) {
      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <>
      <li
        className="relative cursor-pointer rounded p-5 text-white transition duration-300 ease-in-out hover:bg-primary-content hover:text-white"
        onClick={() => {
          setCurrentRoom(room);
          removeAlarm(id);
        }}
        ref={liRef}
      >
        <div className="flex items-center justify-between">
          <h3>{title}</h3>
          <p className="flex items-center gap-2 text-sm font-light">
            <span ref={alarmRef}>🔔</span>
            {isHost ? <span>👑</span> : isJoined && <span>💬</span>}
          </p>
        </div>
        <Divider isDisplay={!isLast} className="absolute bottom-0 left-0" />
      </li>
    </>
  );
};

export default Room;
