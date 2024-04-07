import MessageContainer from '../components/Home/MessageContainer/MessageContainer';
import SideBar from '../components/Home/SideBar/SideBar';
import useGetRooms from '../hooks/useGetRooms';
import useRealTimeMessages from '../hooks/useRealTimeMessages';

const Home = () => {
  useRealTimeMessages();
  const { isLoading: isRoomsLoading, rooms } = useGetRooms();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white bg-opacity-10 bg-clip-padding backdrop-blur-lg backdrop-filter md:h-5/6 md:w-10/12 md:flex-row">
      <SideBar isRoomsLoading={isRoomsLoading} rooms={rooms} />
      <MessageContainer />
    </div>
  );
};

export default Home;
