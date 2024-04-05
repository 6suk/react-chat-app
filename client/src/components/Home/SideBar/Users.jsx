import useRoomStore from '../../../store/useRoomStore';

const Users = () => {
  const { currentRoom } = useRoomStore();

  return (
    <>
      <div className="overflow-auto pt-2">
        {/* 전체 유저 collapse */}
        {currentRoom ? (
          <div className="collapse collapse-arrow bg-opacity-0">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-opacity-0 text-white peer-checked:bg-opacity-0">
              전체 유저
            </div>
            <User isCollapse={true} />
          </div>
        ) : (
          <User />
        )}

        {/* 채팅방 유저 collapse */}
        {currentRoom && (
          <div className="collapse collapse-arrow bg-opacity-0">
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-opacity-0 text-white peer-checked:bg-opacity-0">
              채팅방 참여유저
            </div>
            <User isCollapse={true} />
          </div>
        )}
      </div>
    </>
  );
};

const User = ({ isCollapse = false }) => {
  return (
    <div
      className={`${isCollapse && 'collapse-content'} bg-opacity-0 p-0 text-white peer-checked:bg-opacity-0`}
    >
      {/* 유저 리스트 */}
      <ul className="flex flex-col">
        <li className="flex items-center justify-start gap-4 rounded px-5 py-4 text-secondary-content">
          <div className="avatar online">
            <div className="w-8 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <p>유저 이름</p>
        </li>
        <div className="w-full border-b border-white opacity-30" />
        <li className="flex items-center justify-start gap-4 rounded px-5 py-4 text-secondary-content">
          <div className="avatar online">
            <div className="w-8 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <p>유저 이름</p>
        </li>
        <div className="w-full border-b border-white opacity-30" />
        <li className="flex items-center justify-start gap-4 rounded px-5 py-4 text-secondary-content">
          <div className="avatar online">
            <div className="w-8 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <p>유저 이름</p>
        </li>
        <div className="w-full border-b border-white opacity-30" />
        <li className="flex items-center justify-start gap-4 rounded px-5 py-4 text-secondary-content">
          <div className="avatar online">
            <div className="w-8 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <p>유저 이름</p>
        </li>
      </ul>
    </div>
  );
};

export default Users;
