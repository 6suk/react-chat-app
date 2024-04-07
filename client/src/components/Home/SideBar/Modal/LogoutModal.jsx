import { AiOutlineClose } from 'react-icons/ai';
import useLogout from '../../../../hooks/useLogout';

const LogoutModal = ({ isModalOpen, setIsModalOpen, menu, setMenu }) => {
  const { isLoading, logout } = useLogout();
  const className = isModalOpen.logout ? 'modal-open' : '';

  const handleCancelClick = () => {
    setMenu({
      menu: menu.dp,
      dp: menu.dp,
    });

    setIsModalOpen({
      ...isModalOpen,
      logout: false,
    });
  };

  return (
    <dialog className={`modal ${className}`}>
      <div className="modal-box relative flex flex-col items-center gap-6 py-8 pt-10">
        <h1 className="text-2xl font-bold">로그아웃</h1>
        <div className="text-center">
          <p>
            로그아웃 시 <b>계정</b>과 <b>생성한 방</b>은 삭제됩니다.
          </p>
          <p>재접속은 새로운 계정으로만 가능합니다.</p>
          <p className="font-bold">정말 로그아웃 하시겠습니까?</p>
        </div>

        <div className="modal-action m-0 w-full justify-center">
          {!isLoading ? (
            <button
              className="btn btn-info flex flex-col"
              type="button"
              onClick={logout}
            >
              로그아웃
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
      </div>
    </dialog>
  );
};

export default LogoutModal;
