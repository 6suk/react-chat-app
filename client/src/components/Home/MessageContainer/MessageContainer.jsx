import { useAuthUser, useCurrentRoom } from '@store/index';

import ChatInput from '@components/Home/MessageContainer/ChatInput';
import Header from '@components/Home/MessageContainer/Header';
import Messages from '@components/Home/MessageContainer/Messages/Messages';
import NoSelectedRoom from '@components/Home/MessageContainer/NoSelectedRoom';

const MessageContainer = () => {
  const currentRoom = useCurrentRoom();
  const authUser = useAuthUser();

  return (
    <>
      {currentRoom ? (
        <article className="flex h-full w-full flex-col gap-6 overflow-auto bg-white px-8 py-6 opacity-90">
          <Header currentRoom={currentRoom} authUser={authUser} />
          <Messages authUser={authUser} />
          <ChatInput currentRoom={currentRoom} />
        </article>
      ) : (
        <NoSelectedRoom authUser={authUser} />
      )}
    </>
  );
};

export default MessageContainer;
