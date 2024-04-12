import { memo, useState } from 'react';
import { AiOutlineDelete, AiOutlineHome } from 'react-icons/ai';

import { getActions, useAuthUser, useCurrentRoom } from '@store/index';

import RemoveModal from '@components/Home/MessageContainer/RemoveModal';

const ChatTopInfo = memo(function ChatTopInfo() {
  const [modalOpen, setModalOpen] = useState(false);
  const { setCurrentRoom } = getActions();
  const currentRoom = useCurrentRoom();
  const authUser = useAuthUser();

  return (
    <>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-bold text-primary-content">
            {currentRoom.title}
          </h1>
          <div className="text-sm font-medium text-info-content">
            {currentRoom.createdUser.name}
          </div>
        </div>
        <div className="join">
          <a
            className="btn join-item btn-sm"
            onClick={() => setCurrentRoom(null)}
          >
            <AiOutlineHome className="h-5 w-5" />
          </a>
          {currentRoom.createdUser.id === authUser.id && (
            <a
              className="btn join-item btn-sm"
              onClick={() => setModalOpen(true)}
            >
              <AiOutlineDelete className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
      <div className="border-b border-gray-400 opacity-30" />
      {modalOpen && (
        <RemoveModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
        />
      )}
    </>
  );
});

export default ChatTopInfo;
