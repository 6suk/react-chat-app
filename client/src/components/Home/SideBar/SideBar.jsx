import { useEffect, useState } from 'react';

import useRoomStore from '../../../store/useRoomStore';

import Menu from './Menu';
import Rooms from './Rooms/Rooms';
import Users from './Users/Users';
import CreateRoomModal from './Modal/CreateRoomModal';
import LogoutModal from './Modal/LogoutModal';

const SideBar = ({ isRoomsLoading, rooms }) => {
  const [menu, setMenu] = useState({
    menu: 'rooms',
    dp: 'rooms',
  });
  const [isModalOpen, setIsModalOpen] = useState({
    chat: false,
    logout: false,
  });
  const { currentRoom } = useRoomStore();

  useEffect(() => {
    if (currentRoom) {
      setMenu({
        menu: 'users',
        dp: 'users',
      });
    } else {
      setMenu({
        menu: 'rooms',
        dp: 'rooms',
      });
    }
  }, [currentRoom]);

  const sideBarComponent = () => {
    switch (menu.dp) {
      case 'rooms':
        return <Rooms isRoomsLoading={isRoomsLoading} rooms={rooms} />;
      case 'users':
        return <Users />;
      default:
        return null;
    }
  };

  const modalComponent = () => {
    const props = {
      menu,
      setMenu,
      isModalOpen,
      setIsModalOpen,
    };

    switch (menu.menu) {
      case 'chat':
        return <CreateRoomModal {...props} />;
      case 'logout':
        return <LogoutModal {...props} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="relative flex h-1/3 min-h-[33%] w-full flex-col md:h-full md:w-1/3">
        {/* SELECT MENU */}
        <Menu
          menu={menu}
          setMenu={setMenu}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        {/* SIDEBAR CONTENT */}
        <div className="h-full overflow-auto px-5">{sideBarComponent()}</div>
      </div>
      {/* MODAL */}
      {modalComponent()}
    </>
  );
};

export default SideBar;
