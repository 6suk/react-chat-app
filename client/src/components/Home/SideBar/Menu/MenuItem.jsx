import { useMemo } from 'react';

import { getActions, getMenu, useModal } from '@store/index';

const MenuItem = ({ name, icon: svg, isModal, ariaLabel }) => {
  const { setMenu, setModal } = getActions();
  const menu = getMenu();
  const modal = useModal();

  const isActive = isModal ? modal === name : menu === name && !modal;
  const className = isActive ? 'opacity-100' : 'opacity-50';

  const icon = useMemo(() => svg, [svg]);

  return (
    <li onClick={() => (isModal ? setModal(name) : setMenu(name))}>
      <button
        className={`*:h-6 *:w-6 ${className} focus:bg-transparent focus:text-white`}
        type="button"
        aria-label={`${ariaLabel}`}
      >
        {icon}
      </button>
    </li>
  );
};

export default MenuItem;
