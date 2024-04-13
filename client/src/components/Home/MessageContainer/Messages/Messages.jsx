import { useEffect, useRef } from 'react';

import useRoomMessages from '@hooks/useRoomMessages';
import { useAuthUser, useMessages } from '@store/index';

import Loading from '@components/Common/Loading';
import AdminMessage from '@components/Home/MessageContainer/Messages/AdminMessage';
import Message from '@components/Home/MessageContainer/Messages/Message';

const Messages = () => {
  const msgRef = useRef();
  const authUser = useAuthUser();
  const messages = useMessages();
  const { isLoading } = useRoomMessages();

  useEffect(() => {
    setTimeout(() => {
      msgRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  return (
    <>
      <ul className="flex h-full flex-col gap-2 overflow-auto">
        {isLoading ? (
          <Loading />
        ) : (
          messages.map(message => {
            const { id, to, from } = message;
            const isDisplay = to.includes(authUser.id);
            const isAdmin = from.id === 'admin';

            return (
              isDisplay &&
              (isAdmin ? (
                <AdminMessage key={id} message={message} ref={msgRef} />
              ) : (
                <Message
                  key={id}
                  ref={msgRef}
                  message={message}
                  isMine={from.id === authUser.id}
                />
              ))
            );
          })
        )}
      </ul>
    </>
  );
};

export default Messages;
