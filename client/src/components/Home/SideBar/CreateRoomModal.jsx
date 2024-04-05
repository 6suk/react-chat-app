import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import useCreateRoom from '../../../hooks/useCreateRoom';

const CreateRoomModal = ({ modalOpen, setModalOpen }) => {
  const [title, setTitle] = useState('');
  const { isLoading, createRoom } = useCreateRoom();

  return (
    <dialog id="my_modal_1" className={`modal ${modalOpen && 'modal-open'}`}>
      <div className="modal-box relative flex flex-col items-center gap-6 py-8 pt-10">
        <h1 className="text-2xl font-bold">채팅방 생성</h1>
        <div className="w-full">
          <input
            type="text"
            placeholder="채팅방 제목"
            className="input w-full bg-secondary-content focus:outline-none disabled:bg-gray-200"
            onChange={e => setTitle(e.target.value)}
            value={title}
            disabled={isLoading}
          />
        </div>
        <div className="modal-action m-0 w-full justify-center">
          {!isLoading ? (
            <button
              className="btn btn-secondary flex flex-col"
              type="button"
              onClick={() => {
                createRoom(title);
                setModalOpen(false);
                setTitle('');
              }}
            >
              생성하기
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
                setTitle('');
              }}
            >
              취소
            </button>
            <button
              className="absolute right-0 top-0 p-5"
              onClick={() => {
                setModalOpen(false);
                setTitle('');
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

export default CreateRoomModal;
