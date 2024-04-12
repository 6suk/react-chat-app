import { forwardRef } from 'react';

import { useAuthUser } from '@store/index';

import formatTimestamp from '@utils/formatTimestamp';

const Message = forwardRef(function Message({ message }, ref) {
  const { id, name } = useAuthUser();
  const { from, content, created_at, to } = message;
  const isAdmin = from.id === 'admin';
  const isMine = from.id === id;
  const chatClassName = isMine ? 'chat-end' : 'chat-start';
  const bubbleClassName = isMine && 'bg-primary';

  if (!to.includes(id)) return;

  return isAdmin ? (
    <div className="my-1 py-1 text-center" ref={ref}>
      📢 {content}
    </div>
  ) : (
    <div className={`chat ${chatClassName}`} ref={ref}>
      <div className="avatar chat-image">
        <p className="w-10 rounded-full">
          <img alt={name} src={from.profile} />
        </p>
      </div>
      {!isMine && (
        <div className="chat-header text-sm text-gray-400">{from.name}</div>
      )}
      <div className={`chat-bubble flex items-center ${bubbleClassName}`}>
        {content}
      </div>
      <time className="chat-footer text-sm opacity-50">
        {formatTimestamp(created_at)}
      </time>
    </div>
  );
});

export default Message;
