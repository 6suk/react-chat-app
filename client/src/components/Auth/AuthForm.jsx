import { useState } from 'react';

import useLogin from '@hooks/useLogin';

import LoadingBtn from '@components/Common/LoadingBtn';

const inputInit = {
  userName: '',
  gender: '',
};

const AuthForm = () => {
  const [input, setInput] = useState(inputInit);
  const { isLoading, login } = useLogin();

  const handleSubmit = async e => {
    e.preventDefault();
    const { userName, gender } = input;
    await login(userName, gender);
    setInput(inputInit);
  };

  return (
    <form
      className="flex w-full flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        className="input input-bordered w-full"
        placeholder="닉네임"
        onChange={e => setInput({ ...input, userName: e.target.value })}
        value={input.userName}
        autoComplete="off"
      />
      <div className="join join-vertical w-full sm:join-horizontal">
        <input
          className="btn join-item w-full sm:w-1/2"
          type="radio"
          name="gender"
          aria-label="남성"
          value="male"
          onChange={e => setInput({ ...input, gender: e.target.value })}
          checked={input.gender === 'male' ? true : false}
        />
        <input
          className="btn join-item w-full sm:w-1/2"
          type="radio"
          name="gender"
          aria-label="여성"
          value="female"
          onChange={e => setInput({ ...input, gender: e.target.value })}
          checked={input.gender === 'female' ? true : false}
        />
      </div>
      {isLoading ? (
        <LoadingBtn isBlock />
      ) : (
        <button type="submit" className="btn btn-secondary btn-block text-base">
          로그인
        </button>
      )}
    </form>
  );
};

export default AuthForm;
