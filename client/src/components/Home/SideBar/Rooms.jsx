import useGetRooms from '../../../hooks/useGetRooms';
import getRandomEmojis from '../../../utils/getRandomEmojis';
import Room from './Room';

const Rooms = () => {
  const { isLoading, rooms } = useGetRooms();

  return (
    <>
      {isLoading ? (
        <p className="loading loading-dots loading-lg mx-auto flex h-full items-center justify-center text-primary opacity-80"></p>
      ) : (
        <div className="flex flex-col overflow-auto py-2">
          {rooms.map((room, index) => {
            return (
              <Room
                key={room.id}
                room={room}
                emoji={getRandomEmojis()}
                isLast={index === rooms.length - 1}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Rooms;
