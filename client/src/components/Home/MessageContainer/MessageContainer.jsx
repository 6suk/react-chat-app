import { useEffect, useRef } from 'react';

import { useAuthContext } from '../../../context/AuthContext';
import useRoomMessages from '../../../hooks/useRoomMessages';
import useRoomStore from '../../../store/useRoomStore';

import useRemoveRoom from '../../../hooks/useRemoveRoom';
import ChatInput from './ChatInput';
import ChatTopInfo from './ChatTopInfo';
import Message from './Message';

const MessageContainer = () => {
  const { isLoading: isRemoveLoading, removeRoom } = useRemoveRoom();
  const { currentRoom, messages, setCurrentRoom } = useRoomStore();
  const { authUser } = useAuthContext();
  const { isLoading } = useRoomMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  return (
    <>
      {currentRoom ? (
        <div className="flex h-full w-full flex-col gap-6 overflow-auto bg-white px-8 py-6 opacity-90">
          <ChatTopInfo
            currentRoom={currentRoom}
            setCurrentRoom={setCurrentRoom}
            authUser={authUser}
            isLoading={isRemoveLoading}
            removeRoom={removeRoom}
          />
          <div className="flex h-full flex-col gap-2 overflow-auto">
            {!isLoading ? (
              messages.map(message => {
                return (
                  // 입장한 이후의 메세지만 보이도록
                  message.to.includes(authUser.id) && (
                    <div key={message.id} ref={lastMessageRef}>
                      <Message
                        key={message.id}
                        message={message}
                        authUser={authUser}
                      />
                    </div>
                  )
                );
              })
            ) : (
              <span className="loading loading-ring mx-auto my-auto w-1/12 text-secondary opacity-80"></span>
            )}
          </div>
          <ChatInput disabled={isLoading} />
        </div>
      ) : (
        <NoSelectedRoom />
      )}
    </>
  );
};

const NoSelectedRoom = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-t border-gray-300 px-8  py-6 text-center text-white opacity-90 md:border-l md:border-t-0">
      <h1 className="text-4xl">🤙🏻</h1>
      <h1 className="text-4xl font-light">
        안녕하세요! <span className="font-bold">{authUser.name}</span>님!
      </h1>
      <div className="pt-3">
        <p>✔ 채팅방을 생성할 수 있어요!</p>
        <p>✔ 만들어진 채팅방에 참여해보세요!</p>
        <div className="mt-5 flex items-center rounded bg-white bg-opacity-20 px-4 py-2">
          <p>💬 : 참여중인 채팅방</p>
          <p className="mx-4 h-3 border-l border-white opacity-30"></p>
          <p>🔔 : 새로운 메세지</p>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
