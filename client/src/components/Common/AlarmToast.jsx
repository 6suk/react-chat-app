import toast from 'react-hot-toast';

import { getActions } from '@store/index';

const AlarmToast = ({ room, message, t }) => {
  const { setCurrentRoom, removeAlarm } = getActions();

  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-0 flex-1 cursor-pointer p-4 transition duration-300 ease-in-out hover:bg-primary/50">
        <div
          className="flex items-start"
          onClick={() => {
            setCurrentRoom(room);
            removeAlarm(room.id);
            toast.remove(t.id);
          }}
        >
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src={message.from.profile}
              alt={message.from.name}
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm text-gray-900">
              <span className="font-semibold text-primary-content">
                {message.from.name}
              </span>
              <span className="px-2 text-gray-300">|</span>
              <span>{room.title}</span>
            </p>
            <p className="mt-1 text-sm text-gray-500">{message.content}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <hr className="h-full border-l border-gray-200" />
        <button
          onClick={() => toast.remove(t.id)}
          className="flex w-full items-center justify-center rounded-none rounded-r-lg p-4 text-sm font-medium text-gray-500 transition duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 "
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AlarmToast;
