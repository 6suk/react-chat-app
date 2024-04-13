const NoSelectedRoom = ({ authUser }) => {
  const { name } = authUser;

  return (
    <article className="flex h-full w-full flex-col items-center justify-center gap-2 border-t border-gray-300 px-8  py-6 text-center text-white opacity-90 md:border-l md:border-t-0">
      <div className="text-4xl">🤙🏻</div>
      <h1 className="text-4xl font-light">
        안녕하세요! <span className="font-bold">{name}</span>님!
      </h1>
      <ul className="pt-3">
        <li>✔ 채팅방을 생성할 수 있어요!</li>
        <li>✔ 만들어진 채팅방에 참여해보세요!</li>
        <ul className="mt-5 flex items-center rounded bg-white bg-opacity-20 px-4 py-2">
          <li>💬 : 참여중인 채팅방</li>
          <hr className="mx-4 h-4 border-l border-white opacity-30" />
          <li>🔔 : 새로운 메세지</li>
        </ul>
      </ul>
    </article>
  );
};

export default NoSelectedRoom;
