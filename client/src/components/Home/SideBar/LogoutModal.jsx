import { AiOutlineClose } from 'react-icons/ai';
import useLogout from '../../../hooks/useLogout';

const LogoutModal = ({ modalOpen, setModalOpen }) => {
  const { isLoading, logout } = useLogout();

  return (
    <dialog id="my_modal_1" className={`modal ${modalOpen && 'modal-open'}`}>
      <div className="modal-box relative flex flex-col items-center gap-6 py-8 pt-10">
        <h1 className="text-2xl font-bold">로그아웃</h1>
        <div className="text-center">
          <p>로그아웃 시 계정은 삭제되며</p>
          <p>재접속은 새로운 계정으로 가능합니다.</p>
          <p className="font-bold">정말 로그아웃 하시겠습니까?</p>
        </div>

        <div className="modal-action m-0 w-full justify-center">
          {!isLoading ? (
            <button
              className="btn btn-info flex flex-col"
              type="button"
              onClick={() => logout()}
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

          <form method="dialog">
            <button
              className="btn"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              취소
            </button>
            <button
              className="absolute right-0 top-0 p-5"
              onClick={() => {
                setModalOpen(false);
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

export default LogoutModal;
