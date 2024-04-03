import useRoomStore from '../../../store/useRoomStore';

const Room = ({ room, emoji, isLast }) => {
  const { joinRoom, setJoinRoom } = useRoomStore();
  const isCurrentJoin = joinRoom?.id === room.id;

  return (
    <>
      <div
        className={`flex cursor-pointer items-center justify-between rounded px-5 py-4 text-white transition duration-300 ease-in-out hover:bg-primary-content hover:text-white
          ${isCurrentJoin && 'bg-primary-content'}`}
        onClick={() => setJoinRoom(room)}
      >
        <p>
          {emoji} {room.title}
        </p>
        <p className="text-sm font-light">{room.users.length}명</p>
      </div>
      {!isLast && <div className="w-full border-b border-white opacity-30" />}
    </>
  );
};

export default Room;
