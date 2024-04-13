import { AiOutlineClose } from 'react-icons/ai';

import { getActions } from '@store/index';

import LoadingBtn from '@components/Common/LoadingBtn';

const ModalLayout = ({
  children,
  isLoading,
  title,
  buttonLabel,
  onSubmit,
  onCancel,
  isGray = false,
}) => {
  const { closeModal } = getActions();
  const commonButtonClass = 'btn min-w-20 ';
  const primaryButtonClass = commonButtonClass + 'btn-secondary';
  const grayButtonClass = commonButtonClass + 'btn-neutral';

  const handleSubmit = async e => {
    e.preventDefault();
    await onSubmit();
    closeModal();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeModal();
  };

  return (
    <dialog className="modal modal-open">
      <form
        className="modal-box relative flex flex-col items-center gap-6 py-8 pt-10"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold">{title}</h1>
        {children}
        <div className="modal-action m-0 w-full justify-center">
          {isLoading ? (
            <LoadingBtn />
          ) : (
            <button
              className={isGray ? grayButtonClass : primaryButtonClass}
              type="submit"
            >
              {buttonLabel}
            </button>
          )}

          {/* 취소 버튼 */}
          <button
            className={commonButtonClass}
            onClick={handleCancel}
            type="button"
          >
            취소
          </button>
          <button
            className="absolute right-0 top-0 p-5"
            onClick={handleCancel}
            type="button"
          >
            <AiOutlineClose className="h-6 w-6" />
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default ModalLayout;
