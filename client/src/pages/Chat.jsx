import useGetRooms from '../hooks/useGetRooms';
import getRandomEmojis from '../utils/getRandomEmojis';
import useRoomStore from '../store/useRoomStore';
import { IoIosSend } from 'react-icons/io';

const Chat = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white bg-opacity-10 bg-clip-padding backdrop-blur-lg backdrop-filter sm:h-5/6 sm:w-10/12 sm:flex-row">
      <SideBar />
      {/* JoinRoom */}
      <div className="flex w-full flex-col gap-6 bg-white px-8 py-6 opacity-90">
        <div className="flex items-center justify-between px-1">
          <h1 className="text-primary-content text-xl font-bold">방이름</h1>
          <p className="text-sm font-medium">고육숙</p>
        </div>
        <div className="border-b border-gray-400 opacity-30" />
        {/* messages */}
        <div className="h-full">
          {/* 받은 메세지 */}
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-bubble flex items-center">
              You were the Chosen One!
            </div>
            <time className="chat-footer text-sm opacity-50">12:45</time>
          </div>
          {/* 보낸 메세지 */}
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="chat-bubble bg-primary flex items-center">
              You were the Chosen One!
            </div>
            <time className="chat-footer text-sm opacity-50">12:45</time>
          </div>
        </div>
        {/* input */}
        <form className="relative w-full" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Type here"
            className="input bg-secondary-content w-full focus:outline-none"
          />
          <button
            className="absolute inset-y-0 end-0 mx-4 my-2 flex items-center"
            type="submit"
          >
            <IoIosSend size={30} color="#5a81fa" />
            {/* <span className="loading loading-spinner bg-secondary"></span> */}
          </button>
        </form>
      </div>
    </div>
  );
};

const SideBar = () => {
  return (
    <div className="flex h-1/4 w-full flex-col border-b border-white border-opacity-30 p-4 px-5 sm:h-full sm:border-r md:w-1/2 lg:w-1/3">
      <Rooms />
    </div>
  );
};

const Rooms = () => {
  const { isLoading, rooms } = useGetRooms();

  return (
    <>
      {isLoading ? (
        <p className="loading loading-dots loading-lg text-primary mx-auto flex h-full items-center justify-center opacity-80"></p>
      ) : (
        <div className="flex flex-col overflow-auto py-2">
          {rooms.map((room, index) => {
            return (
              <Room
                key={room.id}
                room={room}
                emoji={getRandomEmojis()}
                isLast={index === rooms.length - 1}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

const Room = ({ room, emoji, isLast }) => {
  const { joinRoom, setJoinRoom } = useRoomStore();
  const isCurrentJoin = joinRoom?.id === room.id;

  return (
    <>
      <div
        className={`hover:bg-primary-content flex cursor-pointer items-center justify-between rounded px-5 py-4 text-white transition duration-300 ease-in-out hover:text-white
          ${isCurrentJoin && 'bg-primary-content'}`}
        onClick={() => setJoinRoom(room)}
      >
        <p>
          {emoji} {room.title}
        </p>
        <p className="text-sm font-light">{room.users.length}명</p>
      </div>
      {!isLast && <div className="w-full border-b border-white opacity-30" />}
    </>
  );
};

export default Chat;
