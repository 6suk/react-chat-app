const ChatTopInfo = ({ currentRoom }) => {
  return (
    <>
      <div className="flex items-center justify-between px-1">
        <h1 className="text-xl font-bold text-primary-content">
          {currentRoom.title}
        </h1>
        <p className="text-sm font-medium">{currentRoom.createdUser.name}</p>
      </div>
      <div className="border-b border-gray-400 opacity-30" />
    </>
  );
};

export default ChatTopInfo;
