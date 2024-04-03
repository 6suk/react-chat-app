import ChatRoom from '../components/Home/ChatRoom/ChatRoom';
import SideBar from '../components/Home/SideBar/SideBar';

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white bg-opacity-10 bg-clip-padding backdrop-blur-lg backdrop-filter sm:h-5/6 sm:w-10/12 sm:flex-row">
      <SideBar />
      <ChatRoom />
    </div>
  );
};

export default Home;
