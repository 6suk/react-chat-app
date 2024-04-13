import { useEffect, useRef, useState } from 'react';
import { IoIosSend } from 'react-icons/io';

import useSendMessage from '@hooks/useSendMessage';

const ChatInput = ({ currentRoom }) => {
  const { isLoading, sendMessage } = useSendMessage();
  const [message, setMessage] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    setMessage('');
    inputRef.current.focus();
  }, [currentRoom]);

  return (
    <form
      className="relative w-full"
      onSubmit={async e => {
        e.preventDefault();
        await sendMessage(message);
        setMessage('');
      }}
    >
      <input
        name="message"
        type="text"
        className="input w-full bg-secondary-content focus:outline-none disabled:cursor-default disabled:bg-gray-200"
        value={message}
        onChange={e => setMessage(e.target.value)}
        ref={inputRef}
      />
      <button
        className="absolute inset-y-0 end-0 mx-4 my-2 flex items-center text-secondary disabled:hidden"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner bg-gray-400" />
        ) : (
          <IoIosSend size={30} />
        )}
      </button>
    </form>
  );
};

export default ChatInput;
