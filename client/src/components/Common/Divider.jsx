const Divider = ({ isDisplay = true, isGray = false }) => {
  return (
    isDisplay && (
      <hr
        className={`w-full  ${!isGray ? 'border-white' : 'border-gray-400'} opacity-30`}
      />
    )
  );
};

export default Divider;
