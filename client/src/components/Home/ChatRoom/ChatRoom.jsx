import ChatInput from './ChatInput';
import Message from './Message';

const ChatRoom = () => {
  return (
    <>
      {/* JoinRoom */}
      <div className="flex h-full w-full flex-col gap-6 bg-white px-8 py-6 opacity-90">
        <div className="flex items-center justify-between px-1">
          <h1 className="text-xl font-bold text-primary-content">방이름</h1>
          <p className="text-sm font-medium">고육숙</p>
        </div>
        <div className="border-b border-gray-400 opacity-30" />
        {/* messages */}
        <div className="h-full">
          <Message />
        </div>
        <ChatInput />
      </div>
    </>
  );
};

export default ChatRoom;
