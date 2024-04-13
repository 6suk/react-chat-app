const LoadingBtn = ({ isBlock = false }) => {
  return (
    <button className={`btn text-base  ${isBlock && 'btn-block'}`} disabled>
      <span className="loading loading-spinner"></span>
      loading...
    </button>
  );
};

export default LoadingBtn;
