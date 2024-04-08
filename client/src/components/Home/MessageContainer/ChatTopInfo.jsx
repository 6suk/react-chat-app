import { useState } from 'react';
import { AiOutlineClose, AiOutlineDelete, AiOutlineHome } from 'react-icons/ai';

const ChatTopInfo = ({
  currentRoom,
  setCurrentRoom,
  authUser,
  isLoading,
  removeRoom,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-baseline gap-2">
          <h1 className="text-xl font-bold text-primary-content">
            {currentRoom.title}
          </h1>
          <div className="text-sm font-medium text-info-content">
            {currentRoom.createdUser.name}
          </div>
        </div>
        <div className="join">
          <a
            className="btn join-item btn-sm"
            onClick={() => setCurrentRoom(null)}
          >
            <AiOutlineHome className="h-5 w-5" />
          </a>
          {currentRoom.createdUser.id === authUser.id && (
            <a
              className="btn join-item btn-sm"
              onClick={() => setModalOpen(true)}
            >
              <AiOutlineDelete className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
      <div className="border-b border-gray-400 opacity-30" />
      {modalOpen && (
        <RemoveModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          isLoading={isLoading}
          removeRoom={removeRoom}
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
        />
      )}
    </>
  );
};

const RemoveModal = ({
  modalOpen,
  setModalOpen,
  isLoading,
  removeRoom,
  currentRoom,
  setCurrentRoom,
}) => {
  return (
    <dialog id="my_modal_1" className={`modal ${modalOpen && 'modal-open'}`}>
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

export default ChatTopInfo;
