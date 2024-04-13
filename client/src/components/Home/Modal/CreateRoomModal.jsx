import { useEffect, useRef, useState } from 'react';

import useCreateRoom from '@hooks/useCreateRoom';

import ModalLayout from '@components/Home/Modal/Layout/ModalLayout';

const CreateRoomModal = () => {
  const inputRef = useRef();
  const [title, setTitle] = useState('');
  const { isLoading, createRoom } = useCreateRoom();

  const onSubmit = async () => {
    await createRoom(title); // fetch
    setTitle('');
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <ModalLayout
      title={'채팅방 생성'}
      buttonLabel={'생성하기'}
      onSubmit={onSubmit}
      onCancel={() => setTitle('')}
      isLoading={isLoading}
    >
      <input
        type="text"
        placeholder="채팅방 제목"
        className="input mx-auto w-5/6 bg-secondary-content focus:outline-none disabled:bg-gray-200"
        onChange={e => setTitle(e.target.value)}
        value={title}
        disabled={isLoading}
        ref={inputRef}
      />
    </ModalLayout>
  );
};

export default CreateRoomModal;
