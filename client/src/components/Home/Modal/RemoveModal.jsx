import useRemoveRoom from '@hooks/useRemoveRoom';
import { useCurrentRoom } from '@store/index';

import ModalLayout from '@components/Home/Modal/Layout/ModalLayout';

const RemoveModal = () => {
  const { isLoading, removeRoom } = useRemoveRoom();
  const currentRoom = useCurrentRoom();

  return (
    currentRoom && (
      <ModalLayout
        title={'채팅방 삭제'}
        buttonLabel={'삭제'}
        onSubmit={() => removeRoom(currentRoom.id)}
        isLoading={isLoading}
      >
        <div className="text-center">
          <p>삭제 시 [{currentRoom.title}] 방의 모든 메세지가 삭제됩니다.</p>
          <p className="font-bold">정말 삭제 하시겠습니까?</p>
        </div>
      </ModalLayout>
    )
  );
};

export default RemoveModal;
