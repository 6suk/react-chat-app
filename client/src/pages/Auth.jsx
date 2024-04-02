import { useState } from 'react';
import useLogin from '../hooks/useLogin';

const Auth = () => {
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');
  const { isLoading, login } = useLogin();

  const handleSubmit = async e => {
    e.preventDefault();
    await login(userName, gender);
    setUserName('');
    setGender('');
  };

  return (
    <>
      <div className="flex h-1/2 w-full overflow-hidden rounded-lg bg-gray-400 bg-opacity-10 bg-clip-padding backdrop-blur-lg backdrop-filter sm:w-[580px]">
        <form
          className="flex w-full flex-col items-center justify-center gap-4 px-20"
          onSubmit={handleSubmit}
        >
          <h1 className="pb-5 text-center text-3xl font-semibold text-gray-300">
            Sing Up & Login
          </h1>
          <div className="flex w-full items-center justify-center gap-2">
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="닉네임"
              onChange={e => setUserName(e.target.value)}
              value={userName}
            />
          </div>
          <div className="flex w-full items-center justify-center gap-2">
            <div className="join join-vertical sm:join-horizontal w-full">
              <input
                className="join-item btn w-full sm:w-1/2"
                type="radio"
                name="gender"
                aria-label="남성"
                value="male"
                onChange={e => setGender(e.target.value)}
                checked={gender === 'male' ? true : false}
              />
              <input
                className="join-item btn w-full sm:w-1/2"
                type="radio"
                name="gender"
                aria-label="여성"
                value="female"
                onChange={e => setGender(e.target.value)}
                checked={gender === 'female' ? true : false}
              />
            </div>
          </div>
          <div className="w-full pt-5">
            {isLoading ? (
              <button className="btn btn-block text-base" disabled>
                <span className="loading loading-spinner"></span>
                loading
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-secondary btn-block text-base"
              >
                로그인
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;