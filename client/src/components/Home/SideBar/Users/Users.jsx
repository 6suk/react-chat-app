import { useAuthContext } from '@context/AuthContext';
import { useSocketContext } from '@context/SocketContext';
import useGetUsers from '@hooks/useGetUsers';
import useRoomStore from '@store/useRoomStore';

import Loading from '@components/Home/SideBar/Loading';
import User from '@components/Home/SideBar/Users/User';

const Users = () => {
  const { onlineUser } = useSocketContext();
  const { currentRoom } = useRoomStore();
  const { authUser } = useAuthContext();
  const { isLoading, users } = useGetUsers();
  const className = currentRoom ? 'collapse-content' : '';

  return (
    <>
      {!isLoading ? (
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
                <User
                  key={authUser.id}
                  user={authUser}
                  isAuthUser={true}
                  isOnline={true}
                />
                {users.map(user => {
                  const isOnline = user && onlineUser.includes(user.id);
                  return (
                    isOnline && (
                      <User
                        key={user.id}
                        user={user}
                        authUser={authUser}
                        isOnline={isOnline}
                      />
                    )
                  );
                })}
                {users.map(user => {
                  const isOnline = user && onlineUser.includes(user.id);
                  return (
                    !isOnline && (
                      <User
                        key={user.id}
                        user={user}
                        authUser={authUser}
                        isOnline={isOnline}
                      />
                    )
                  );
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
              <User user={authUser} isAuthUser={true} isOnline={true} />
              {currentRoom.users.map(userId => {
                const user = users.find(user => user.id === userId);
                return (
                  user && (
                    <User
                      key={user.id}
                      user={user}
                      authUser={authUser}
                      isOnline={onlineUser.includes(user.id)}
                    />
                  )
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Users;
