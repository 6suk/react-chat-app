import { forwardRef } from 'react';

import formatTimestamp from '@utils/formatTimestamp';

const Message = forwardRef(function Message({ message, isMine }, ref) {
  const { from, content, created_at } = message;
  const className = {
    chat: isMine ? 'chat-end' : 'chat-start',
    bubble: isMine ? 'bg-primary' : '',
  };

  return (
    <li className={`chat ${className.chat}`} ref={ref}>
      <div className="avatar chat-image">
        <p className="w-10 rounded-full">
          <img alt={from.name} src={from.profile} />
        </p>
      </div>
      {!isMine && (
        <div className="chat-header text-sm text-gray-400">{from.name}</div>
      )}
      <div className={`chat-bubble flex items-center ${className.bubble}`}>
        {content}
      </div>
      <time className="chat-footer text-sm opacity-50">
        {formatTimestamp(created_at)}
      </time>
    </li>
  );
});

export default Message;
