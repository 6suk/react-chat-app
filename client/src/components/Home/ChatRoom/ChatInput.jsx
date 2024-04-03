import { IoIosSend } from 'react-icons/io';

const ChatInput = () => {
  return (
    <form className="relative w-full" onSubmit={e => e.preventDefault()}>
      <input
        type="text"
        placeholder="Type here"
        className="input w-full bg-secondary-content focus:outline-none"
      />
      <button
        className="absolute inset-y-0 end-0 mx-4 my-2 flex items-center"
        type="submit"
      >
        <IoIosSend size={30} color="#5a81fa" />
        {/* <span className="loading loading-spinner bg-secondary"></span> */}
      </button>
    </form>
  );
};

export default ChatInput;
