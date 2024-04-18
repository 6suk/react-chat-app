import { useEffect } from 'react';

import { getActions, useMenu } from '@store/index';

import Menu from '@components/Home/SideBar/Menu/Menu';
import Rooms from '@components/Home/SideBar/Rooms/Rooms';
import Users from '@components/Home/SideBar/Users/Users';

const SideBarComponents = {
  rooms: <Rooms />,
  users: <Users />,
};

const SideBar = () => {
  const menu = useMenu();
  const { getUsers, getRooms } = getActions();

  useEffect(() => {
    getUsers();
    getRooms();
  }, []);

  return (
    <>
      <aside className="relative flex h-1/3 min-h-[33%] w-full flex-col md:h-full md:w-1/3">
        <Menu />
        <div className="h-full overflow-auto px-5">
          {SideBarComponents[menu]}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
