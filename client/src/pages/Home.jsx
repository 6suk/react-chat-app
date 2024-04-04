import MessageContainer from '../components/Home/MessageContainer/MessageContainer';
import SideBar from '../components/Home/SideBar/SideBar';

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white bg-opacity-10 bg-clip-padding backdrop-blur-lg backdrop-filter sm:h-5/6 sm:w-10/12 sm:flex-row">
      <SideBar />
      <MessageContainer />
    </div>
  );
};

export default Home;
