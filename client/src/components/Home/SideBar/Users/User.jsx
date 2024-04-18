import { useEffect, useRef } from 'react';

import { useBoundStore } from '@store/useBoundStore';

import Divider from '@components/Common/Divider';

import { toggleClass } from '@utils/toggleClass';

const User = ({ user, isAuthUser = false }) => {
  const onlineRef = useRef();

  useEffect(() => {
    const unsub = useBoundStore.subscribe(
      state => state.onlineUsers,
      onlineUsers => {
        const isOnline = onlineUsers.includes(user.id);
        toggleClass(onlineRef.current, 'online', isOnline);
        toggleClass(onlineRef.current, 'offline', !isOnline);
      },
      {
        fireImmediately: true,
      }
    );

    return unsub;
  }, []);

  return (
    <>
      <Divider isDisplay={!isAuthUser} />

      <li className="flex items-center justify-start gap-4 rounded px-5 py-4 text-secondary-content">
        <div className="avatar" ref={onlineRef}>
          <div className="w-10 rounded-full">
            <img src={`${user.profile}`} alt={`${user.name}`} />
          </div>
        </div>
        <p className="flex w-full justify-between">
          <span>{user.name}</span>
          {isAuthUser && <span>me</span>}
        </p>
      </li>
    </>
  );
};

export default User;
