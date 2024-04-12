import { memo, useEffect, useRef } from 'react';

import { getActions } from '@store/index';
import { useBoundStore } from '@store/useBoundStore';

const Room = memo(function Room({ room, isLast, isJoined }) {
  const { id, title } = room;
  const { setCurrentRoom, removeAlarm } = getActions();
  const alarmRef = useRef();
  const liRef = useRef();

  // 불필요한 재랜더링 막기
  useEffect(() => {
    const unsub = useBoundStore.subscribe(
      state => [state.alarms, state.currentRoom],
      state => {
        const alarms = state[0];
        if (alarms?.includes(room.id)) {
          alarmRef.current?.classList.remove('hidden');
        } else {
          alarmRef.current?.classList.add('hidden');
        }
        const currentRoom = state[1];
        if (currentRoom?.id === room.id) {
          liRef.current?.classList.add('bg-primary-content');
          liRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        } else {
          liRef.current?.classList.remove('bg-primary-content');
        }
      },
      {
        fireImmediately: true,
      }
    );

    return unsub;
  }, []);

  return (
    <>
      <li
        className="flex cursor-pointer items-center justify-between rounded px-5 py-4 text-white transition duration-300 ease-in-out hover:bg-primary-content hover:text-white"
        onClick={() => {
          setCurrentRoom(room);
          removeAlarm(id);
        }}
        ref={liRef}
      >
        <h3>{title}</h3>
        <p className="flex items-center gap-2 text-sm font-light">
          {isJoined && (
            <span>
              <span className="pr-1" ref={alarmRef}>
                🔔
              </span>
              💬
            </span>
          )}
        </p>
      </li>
      {!isLast && <div className="w-full border-b border-white opacity-30" />}
    </>
  );
});

export default Room;
