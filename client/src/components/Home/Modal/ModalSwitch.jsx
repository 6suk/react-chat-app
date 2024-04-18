import { useModal } from '@store/index';

import CreateRoomModal from '@components/Home/Modal/CreateRoomModal';
import LogoutModal from '@components/Home/Modal/LogoutModal';
import RemoveModal from '@components/Home/Modal/RemoveModal';

const modalComponents = {
  chat: <CreateRoomModal />,
  logout: <LogoutModal />,
  removeRoom: <RemoveModal />,
};

const ModalSwitch = () => {
  const modal = useModal();
  return modalComponents[modal];
};

export default ModalSwitch;
