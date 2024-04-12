import { memo } from 'react';

import {
  getAuthUser,
  useCurrentRoom,
  useIsUsersLoading,
  useUsers,
} from '@store/index';

import Loading from '@components/Home/SideBar/Loading';
import User from '@components/Home/SideBar/Users/User';

const Users = memo(function Users() {
  const currentRoom = useCurrentRoom();
  const authUser = getAuthUser();
  const isUsersLoading = useIsUsersLoading();
  const users = useUsers();
  const className = currentRoom ? 'collapse-content' : '';

  return (
    <>
      {!isUsersLoading ? (
        <div className="overflow-auto pt-2">
          {/* 전체 유저 collapse */}
          <div className="collapse collapse-arrow bg-opacity-0">
            {currentRoom && (
              <>
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-opacity-0 text-white peer-checked:bg-opacity-0">
                  전체 유저
                </div>
              </>
            )}

            <div
              className={`${className} bg-opacity-0 p-0 text-white peer-checked:bg-opacity-0`}
            >
              <ul className="flex flex-col">
                <User key={authUser.id} user={authUser} isAuthUser />
                {users.map(user => {
                  const { id } = user;
                  return <User key={id} user={user} />;
                })}
              </ul>
            </div>
          </div>

          {/* 채팅방 유저 collapse */}
          {currentRoom && (
            <div className="collapse collapse-arrow bg-opacity-0">
              <input type="checkbox" className="peer" defaultChecked />
              <div className="collapse-title bg-opacity-0 text-white peer-checked:bg-opacity-0">
                채팅방 참여유저
              </div>
              <div className="collapse-content bg-opacity-0 p-0 text-white peer-checked:bg-opacity-0">
                <ul className="flex flex-col">
                  <User key={authUser.id} user={authUser} isAuthUser />
                  {users.map(user => {
                    const { id } = user;
                    const isJoined = currentRoom.users.includes(id);
                    return isJoined && <User key={id} user={user} />;
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
});

export default Users;
