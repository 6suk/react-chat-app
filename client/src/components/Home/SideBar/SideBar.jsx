import { useEffect, useState } from 'react';

import { useFetch } from '@context/FetchContext';
import { getActions } from '@store/index';

import Menu from '@components/Home/SideBar/Menu';
import CreateRoomModal from '@components/Home/SideBar/Modal/CreateRoomModal';
import LogoutModal from '@components/Home/SideBar/Modal/LogoutModal';
import Rooms from '@components/Home/SideBar/Rooms/Rooms';
import Users from '@components/Home/SideBar/Users/Users';

const SideBar = () => {
  const fs = useFetch();
  const { getUsers, getRooms } = getActions();
  const [menu, setMenu] = useState('rooms');
  const [isModalOpen, setIsModalOpen] = useState({
    chat: false,
    logout: false,
  });

  useEffect(() => {
    getUsers(fs);
    getRooms(fs);
  }, []);

  const props = {
    menu,
    setMenu,
    isModalOpen,
    setIsModalOpen,
  };

  const modalComponent = {
    chat: <CreateRoomModal {...props} />,
    logout: <LogoutModal {...props} />,
  };

  const sideBarComponents = {
    rooms: <Rooms />,
    users: <Users />,
    chat: <Rooms />,
    logout: <Users />,
  };

  return (
    <>
      <div className="relative flex h-1/3 min-h-[33%] w-full flex-col md:h-full md:w-1/3">
        <Menu {...props} />
        {modalComponent[menu] || null}

        <div className="h-full overflow-auto px-5">
          {sideBarComponents[menu]}
        </div>
      </div>
    </>
  );
};

export default SideBar;
