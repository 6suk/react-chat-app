const Message = () => {
  return (
    <>
      {/* 받은 메세지 */}
      <div className="chat chat-start">
        <div className="avatar chat-image">
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
        <div className="avatar chat-image">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className="chat-bubble flex items-center bg-primary">
          You were the Chosen One!
        </div>
        <time className="chat-footer text-sm opacity-50">12:45</time>
      </div>
    </>
  );
};

export default Message;
