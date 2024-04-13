import useLogout from '@hooks/useLogout';

import ModalLayout from '@components/Home/Modal/Layout/ModalLayout';

const LogoutModal = () => {
  const { isLoading, logout } = useLogout();

  return (
    <ModalLayout
      title={'로그아웃'}
      buttonLabel={'로그아웃'}
      onSubmit={logout}
      isLoading={isLoading}
      isGray
    >
      <div className="text-center">
        <p>
          로그아웃 시 <b>계정</b>과 <b>생성한 방</b>은 삭제됩니다.
        </p>
        <p>재접속은 새로운 계정으로만 가능합니다.</p>
        <p className="font-bold">정말 로그아웃 하시겠습니까?</p>
      </div>
    </ModalLayout>
  );
};

export default LogoutModal;
