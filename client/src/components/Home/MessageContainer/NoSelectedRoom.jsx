import { useAuthUser } from '@store/index';

export const NoSelectedRoom = () => {
  const { name } = useAuthUser();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 border-t border-gray-300 px-8  py-6 text-center text-white opacity-90 md:border-l md:border-t-0">
      <h1 className="text-4xl">🤙🏻</h1>
      <h1 className="text-4xl font-light">
        안녕하세요! <span className="font-bold">{name}</span>님!
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
