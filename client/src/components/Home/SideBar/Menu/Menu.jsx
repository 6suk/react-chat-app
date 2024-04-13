import {
  AiOutlineFolderAdd,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineTeam,
} from 'react-icons/ai';

import MenuItem from '@components/Home/SideBar/Menu/MenuItem';

const menuItems = [
  { name: 'rooms', icon: <AiOutlineMenu />, isModal: false },
  { name: 'users', icon: <AiOutlineTeam />, isModal: false },
  { name: 'chat', icon: <AiOutlineFolderAdd />, isModal: true },
  { name: 'logout', icon: <AiOutlineLogout />, isModal: true },
];

const Menu = () => {
  const lastIdx = menuItems.length - 1;

  return (
    <menu className="menu menu-horizontal menu-md sticky flex-nowrap justify-between border-b border-opacity-10 bg-opacity-0 px-6 py-5 text-white">
      <ul className="flex max-sm:flex-wrap">
        {menuItems.map((item, index) => {
          return lastIdx !== index && <MenuItem key={item.name} {...item} />;
        })}
      </ul>
      <MenuItem {...menuItems[lastIdx]} />
    </menu>
  );
};

export default Menu;
