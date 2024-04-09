const User = ({ user, isOnline, isAuthUser = false }) => {
  return (
    <>
      {!isAuthUser && (
        <div className="w-full border-b border-white opacity-30" />
      )}
      <li className="flex items-center justify-start gap-4 rounded px-5 py-4 text-secondary-content">
        <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
          <div className="w-10 rounded-full">
            <img src={`${user.profile}`} />
          </div>
        </div>
        <div className="flex w-full justify-between">
          <p>{user.name}</p>
          {isAuthUser && <p>me</p>}
        </div>
      </li>
    </>
  );
};

export default User;
