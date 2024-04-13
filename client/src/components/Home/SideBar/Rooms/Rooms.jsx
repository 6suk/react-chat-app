import { memo } from 'react';

import { useIsRoomsLoading, useRooms } from '@store/index';

import Loading from '@components/Common/Loading';
import Room from '@components/Home/SideBar/Rooms/Room';

const Rooms = memo(function Rooms() {
  const rooms = useRooms();
  const isRoomsLoading = useIsRoomsLoading();

  return (
    <>
      {isRoomsLoading ? (
        <Loading />
      ) : (
        <ul className="flex flex-col py-2">
          {rooms.map((room, index) => {
            const isLast = index === rooms.length - 1;
            return <Room key={room.id} room={room} isLast={isLast} />;
          })}
        </ul>
      )}
    </>
  );
});

export default Rooms;
