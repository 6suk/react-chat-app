import { useEffect } from 'react';

import { getActions } from '@store/index';

import MessageContainer from '@components/Home/MessageContainer/MessageContainer';
import ModalSwitch from '@components/Home/Modal/ModalSwitch';
import SideBar from '@components/Home/SideBar/SideBar';

const Home = () => {
  const { socketOpen, socketClose } = getActions();

  useEffect(() => {
    socketOpen();
    return socketClose;
  }, []);

  return (
    <>
      <section className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white bg-opacity-10 bg-clip-padding backdrop-blur-lg backdrop-filter md:h-5/6 md:w-10/12 md:flex-row">
        <SideBar />
        <MessageContainer />
      </section>
      <ModalSwitch />
    </>
  );
};

export default Home;
