import { useState } from 'react';

import {
  AiOutlineFolderAdd,
  AiOutlineHome,
  AiOutlineTeam,
} from 'react-icons/ai';
import Rooms from './Rooms';
import CreateRoomModal from './CreateRoomModal';

const SideBar = () => {
  const [menu, setMenu] = useState('rooms');
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex h-1/3 w-full flex-col gap-2 p-4 px-5 md:h-full md:w-1/3">
      {/* 메뉴 */}
      <ul className="menu menu-horizontal menu-md flex-nowrap justify-between rounded-box bg-white bg-opacity-95 text-base">
        <div className="flex">
          <li onClick={() => setMenu('rooms')}>
            <a>
              <AiOutlineHome className="h-5 w-5 text-base-content" />
            </a>
          </li>
          <li onClick={() => setMenu('users')}>
            <a>
              <AiOutlineTeam className="h-5 w-5 text-base-content" />
            </a>
          </li>
        </div>
        <div className="flex">
          <li onClick={() => setModalOpen(true)}>
            <a>
              <AiOutlineFolderAdd className="h-5 w-5 text-base-content" />
              <span className="hidden 2xl:inline-block">Add Chat</span>
            </a>
          </li>
        </div>
      </ul>
      {menu === 'rooms' && <Rooms />}
      {menu === 'users' && <div>users!</div>}
      <CreateRoomModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default SideBar;
