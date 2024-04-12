import { AiOutlineClose } from 'react-icons/ai';

import useRemoveRoom from '@hooks/useRemoveRoom';

const RemoveModal = ({
  modalOpen,
  setModalOpen,
  currentRoom,
  setCurrentRoom,
}) => {
  const { isLoading, removeRoom } = useRemoveRoom();

  return (
    <dialog className={`modal ${modalOpen && 'modal-open'}`}>
      <div className="modal-box relative flex flex-col items-center gap-6 py-8 pt-10">
        <h1 className="text-2xl font-bold">채팅방 삭제</h1>
        <div className="text-center">
          <p>삭제 시 [{currentRoom.title}] 방의 모든 메세지가 삭제됩니다.</p>
          <p className="font-bold">정말 삭제 하시겠습니까?</p>
        </div>

        <div className="modal-action m-0 w-full justify-center">
          {!isLoading ? (
            <button
              className="btn btn-neutral flex flex-col"
              type="button"
              onClick={() => {
                removeRoom(currentRoom.id);
                setCurrentRoom(null);
              }}
            >
              삭제
            </button>
          ) : (
            <button
              className="btn btn-secondary flex w-20 flex-col disabled:bg-gray-300"
              type="button"
              disabled
            >
              <span className="loading loading-dots loading-md mx-auto flex h-full items-center justify-center text-gray-500 opacity-80"></span>
            </button>
          )}

          <form method="dialog">
            <button
              className="btn"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              취소
            </button>
            <button
              className="absolute right-0 top-0 p-5"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <AiOutlineClose className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default RemoveModal;
