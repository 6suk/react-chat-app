import { memo } from 'react';
import { AiOutlineDelete, AiOutlineHome } from 'react-icons/ai';

import { getActions } from '@store/index';

import Divider from '@components/Common/Divider';

const Header = memo(function ChatTopInfo({ currentRoom, authUser }) {
  const { title, createdUser } = currentRoom;
  const { setCurrentRoom, setModal } = getActions();
  const isHost = createdUser.id === authUser.id;

  return (
    <>
      <header className="flex items-center justify-between px-1">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-bold text-primary-content">{title}</h1>
          <p className="text-sm font-medium text-info-content">
            {createdUser.name} {isHost && <span>👑</span>}
          </p>
        </div>

        <div className="join">
          <a
            className="btn join-item btn-sm"
            onClick={() => setCurrentRoom(null)}
          >
            <AiOutlineHome className="h-5 w-5" />
          </a>
          {createdUser.id === authUser.id && (
            <a
              className="btn join-item btn-sm"
              onClick={() => setModal('removeRoom')}
            >
              <AiOutlineDelete className="h-5 w-5" />
            </a>
          )}
        </div>
      </header>
      <Divider isGray />
    </>
  );
});

export default Header;
