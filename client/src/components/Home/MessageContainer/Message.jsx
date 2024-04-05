import { useAuthContext } from '../../../context/AuthContext';
import formatTimestamp from '../../../utils/formatTimestamp';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const isAdmin = message.from.id === 'admin';
  const chatClassName =
    message.from.id === authUser.id ? 'chat-end' : 'chat-start';
  const bubbleClassName = message.from.id === authUser.id && 'bg-primary';

  return (
    <>
      {isAdmin ? (
        <div>{message.content}</div>
      ) : (
        <div className={`chat ${chatClassName}`}>
          <div className="avatar chat-image">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src={message.from.profile}
              />
            </div>
          </div>
          <div className="chat-header text-sm text-gray-400">
            {message.from.name}
          </div>
          <div className={`chat-bubble flex items-center ${bubbleClassName}`}>
            {message.content}
          </div>
          <time className="chat-footer text-sm opacity-50">
            {formatTimestamp(message.created_at)}
          </time>
        </div>
      )}
    </>
  );
};

export default Message;
