import useRoomMessages from '@hooks/useRoomMessages';
import { getAuthUser, useCurrentRoom } from '@store/index';

import ChatInput from '@components/Home/MessageContainer/ChatInput';
import ChatTopInfo from '@components/Home/MessageContainer/ChatTopInfo';
import Messages from '@components/Home/MessageContainer/Messages';
import { NoSelectedRoom } from '@components/Home/MessageContainer/NoSelectedRoom';

const MessageContainer = () => {
  const currentRoom = useCurrentRoom();
  const authUser = getAuthUser();
  const { isLoading } = useRoomMessages();

  return (
    <>
      {currentRoom ? (
        <div className="flex h-full w-full flex-col gap-6 overflow-auto bg-white px-8 py-6 opacity-90">
          <ChatTopInfo />
          <Messages />
          <ChatInput disabled={isLoading} />
        </div>
      ) : (
        <NoSelectedRoom />
      )}
    </>
  );
};

export default MessageContainer;
