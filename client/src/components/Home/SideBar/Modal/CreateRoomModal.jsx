import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import useCreateRoom from '../../../../hooks/useCreateRoom';

const CreateRoomModal = ({ isModalOpen, setIsModalOpen, menu, setMenu }) => {
  const [title, setTitle] = useState('');

  const { isLoading, createRoom } = useCreateRoom();
  const className = isModalOpen.chat ? 'modal-open' : '';

  const onSubmit = e => {
    e.preventDefault();
    createRoom(title); // fetch
    setIsModalOpen({ ...isModalOpen, chat: false });
    setTitle('');
  };

  const handleCancelClick = () => {
    setMenu({
      menu: menu.dp,
      dp: menu.dp,
    });

    setIsModalOpen({
      ...isModalOpen,
      chat: false,
    });

    setTitle('');
  };

  return (
    <dialog className={`modal ${className}`} onSubmit={onSubmit}>
      <form className="modal-box relative flex flex-col items-center gap-6 py-8 pt-10">
        <h1 className="text-2xl font-bold">채팅방 생성</h1>
        <input
          type="text"
          placeholder="채팅방 제목"
          className="input mx-auto w-5/6 bg-secondary-content focus:outline-none disabled:bg-gray-200"
          onChange={e => setTitle(e.target.value)}
          value={title}
          disabled={isLoading}
        />
        <div className="modal-action m-0 w-full justify-center">
          {!isLoading ? (
            <button className="btn btn-secondary flex flex-col" type="submit">
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

          {/* 취소 버튼 */}
          <div method="dialog">
            <button className="btn" onClick={handleCancelClick}>
              취소
            </button>
            <button
              className="absolute right-0 top-0 p-5"
              onClick={handleCancelClick}
            >
              <AiOutlineClose className="h-6 w-6" />
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
};

export default CreateRoomModal;
