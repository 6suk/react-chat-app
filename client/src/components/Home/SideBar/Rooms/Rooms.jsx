import { useAuthUser, useIsRoomsLoading, useRooms } from '@store/index';

import Loading from '@components/Home/SideBar/Loading';
import Room from '@components/Home/SideBar/Rooms/Room';

const Rooms = () => {
  const authUser = useAuthUser();
  const rooms = useRooms();
  const isRoomsLoading = useIsRoomsLoading();

  return (
    <>
      {isRoomsLoading ? (
        <Loading />
      ) : (
        <ul className="flex flex-col py-2">
          {rooms.map((room, index) => {
            const { id } = room;
            const isLast = index === room.length - 1;
            const isJoined = room.users.includes(authUser.id);

            return (
              <Room key={id} room={room} isLast={isLast} isJoined={isJoined} />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Rooms;
