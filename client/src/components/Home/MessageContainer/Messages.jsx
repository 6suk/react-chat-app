import { useEffect, useRef } from 'react';

import useRoomMessages from '@hooks/useRoomMessages';
import { useMessages } from '@store/index';

import Message from '@components/Home/MessageContainer/Message';

const Messages = () => {
  const msgRef = useRef();
  const messages = useMessages();
  const { isLoading } = useRoomMessages();

  useEffect(() => {
    setTimeout(() => {
      msgRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  return (
    <>
      <div className="flex h-full flex-col gap-2 overflow-auto">
        {isLoading ? (
          <p className="loading loading-ring mx-auto my-auto w-1/12 text-secondary opacity-80"></p>
        ) : (
          messages.map(message => {
            return <Message key={message.id} message={message} ref={msgRef} />;
          })
        )}
      </div>
    </>
  );
};

export default Messages;
