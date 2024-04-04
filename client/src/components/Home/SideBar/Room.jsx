const Room = ({
  room,
  emoji,
  setCurrentRoom,
  removeUpdateRooms,
  isLast,
  isUpdate,
  isCurrent,
  isJoined,
}) => {
  return (
    <>
      <div
        className={`flex cursor-pointer items-center justify-between rounded px-5 py-4 text-white transition duration-300 ease-in-out hover:bg-primary-content hover:text-white
          ${isCurrent && 'bg-primary-content'}`}
        onClick={() => {
          setCurrentRoom(room);
          removeUpdateRooms(room.id);
        }}
      >
        <p>
          {emoji} {room.title}
        </p>
        <p className="flex items-center gap-2 text-sm font-light">
          {isJoined && (
            <span>{isUpdate && <span className="pr-1">🔔</span>}💬</span>
          )}
          {/* {room.users.length}명 */}
        </p>
      </div>
      {!isLast && <div className="w-full border-b border-white opacity-30" />}
    </>
  );
};

export default Room;
