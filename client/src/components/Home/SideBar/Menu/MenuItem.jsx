import { useMemo } from 'react';

import { getActions, getMenu, useModal } from '@store/index';

const MenuItem = ({ name, icon: svg, isModal }) => {
  const { setMenu, setModal } = getActions();
  const menu = getMenu();
  const modal = useModal();

  const isActive = isModal ? modal === name : menu === name && !modal;
  const className = isActive ? 'opacity-100' : 'opacity-50';

  const icon = useMemo(() => svg, []);

  return (
    <li onClick={() => (isModal ? setModal(name) : setMenu(name))}>
      <a className={`*:h-6 *:w-6 ${className}`}>{icon}</a>
    </li>
  );
};

export default MenuItem;
