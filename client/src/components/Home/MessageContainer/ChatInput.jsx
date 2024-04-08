import { useState } from 'react';
import { IoIosSend } from 'react-icons/io';

import useSendMessage from '@hooks/useSendMessage';

const ChatInput = ({ disabled = false }) => {
  const { isLoading, sendMessage } = useSendMessage();
  const [message, setMessage] = useState('');

  return (
    <form
      className="relative w-full"
      onSubmit={e => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
      }}
    >
      <input
        name="message"
        type="text"
        placeholder="Type here"
        className="input w-full bg-secondary-content focus:outline-none disabled:bg-gray-200"
        disabled={disabled}
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        className="absolute inset-y-0 end-0 mx-4 my-2 flex items-center text-secondary disabled:hidden"
        type="submit"
        disabled={disabled || isLoading}
      >
        <IoIosSend size={30} />
        {/* <span className="loading loading-spinner bg-secondary"></span> */}
      </button>
    </form>
  );
};

export default ChatInput;
