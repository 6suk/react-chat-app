import { useEffect, useRef } from 'react';

import { useBoundStore } from '@store/useBoundStore';

const User = ({ user, isAuthUser = false }) => {
  const onlineRef = useRef();

  useEffect(() => {
    const unsub = useBoundStore.subscribe(
      state => state.onlineUsers,
      onlineUsers => {
        if (onlineUsers.includes(user.id)) {
          onlineRef.current.classList = 'avatar online';
        } else {
          onlineRef.current.classList = 'avatar offline';
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
      {!isAuthUser && (
        <div className="w-full border-b border-white opacity-30" />
      )}
      <li className="flex items-center justify-start gap-4 rounded px-5 py-4 text-secondary-content">
        <div className="avatar" ref={onlineRef}>
          <div className="w-10 rounded-full">
            <img src={`${user.profile}`} alt={`${user.name}`} />
          </div>
        </div>
        <div className="flex w-full justify-between">
          <p>{user.name}</p>
          {isAuthUser && <p>me</p>}
        </div>
      </li>
    </>
  );
};

export default User;
