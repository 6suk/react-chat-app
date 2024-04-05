import { useEffect, useState } from 'react';

import Rooms from './Rooms';
import CreateRoomModal from './CreateRoomModal';
import Users from './Users';
import {
  AiOutlineFolderAdd,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineTeam,
} from 'react-icons/ai';
import LogoutModal from './LogoutModal';

const SideBar = () => {
  const [menu, setMenu] = useState('rooms');
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    if (!createRoomModalOpen) {
      setMenu('rooms');
    }
  }, [createRoomModalOpen]);

  return (
    <div className="relative flex h-1/3 min-h-[33%] w-full flex-col md:h-full md:w-1/3">
      {/* 메뉴 */}
      <ul className="menu menu-horizontal menu-md sticky flex-nowrap justify-between border-b border-opacity-10 bg-opacity-0 px-6 py-5 text-white">
        <div className="flex max-sm:flex-wrap">
          <li onClick={() => setMenu('rooms')}>
            <a>
              <AiOutlineHome
                className={`h-6 w-6 text-white  ${menu === 'rooms' ? 'opacity-100' : 'opacity-50'}`}
              />
            </a>
          </li>
          <li onClick={() => setMenu('users')}>
            <a>
              <AiOutlineTeam
                className={`h-6 w-6 text-white  ${menu === 'users' ? 'opacity-100' : 'opacity-50'}`}
              />
            </a>
          </li>
          <li
            onClick={() => {
              setCreateRoomModalOpen(true);
              setMenu('chat');
            }}
          >
            <a>
              <AiOutlineFolderAdd
                className={`h-6 w-6 text-white  ${menu === 'chat' ? 'opacity-100' : 'opacity-50'}`}
              />
              <span className="hidden opacity-60 2xl:inline-block">
                Add Chat
              </span>
            </a>
          </li>
        </div>
        <div className="flex">
          <li
            onClick={() => {
              setMenu('logout');
              setLogoutModalOpen(true);
            }}
          >
            <a>
              <AiOutlineLogout
                className={`h-6 w-6 text-white  ${menu === 'logout' ? 'opacity-100' : 'opacity-50'}`}
              />
            </a>
          </li>
        </div>
      </ul>

      <div className="h-full overflow-auto px-5">
        {menu === 'rooms' && <Rooms />}
        {menu === 'users' && <Users />}
      </div>

      {menu === 'chat' && (
        <CreateRoomModal
          modalOpen={createRoomModalOpen}
          setModalOpen={setCreateRoomModalOpen}
        />
      )}
      {menu === 'logout' && (
        <LogoutModal
          modalOpen={logoutModalOpen}
          setModalOpen={setLogoutModalOpen}
        />
      )}
    </div>
  );
};

export default SideBar;
