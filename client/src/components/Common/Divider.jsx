const Divider = ({ isDisplay = true, isGray = false, className = '' }) => {
  return (
    isDisplay && (
      <hr
        className={`w-full ${!isGray ? 'border-white' : 'border-gray-400'} opacity-30 ${className}`}
      />
    )
  );
};

export default Divider;
