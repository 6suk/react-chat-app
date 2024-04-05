import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSocketContext } from '../context/SocketContext';
import APIService from '../utils/APIService';

const useGetRooms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const { socket } = useSocketContext();
  const as = new APIService();

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    socket?.on('new room', room => {
      if (rooms.length === 0) {
        getRooms();
        return;
      }
      setRooms([...rooms, room]);
    });

    // (임시) room 입장 시 rooms 반환 => 참여 유저가 실시간으로 연동 되어야함
    socket?.on('new join', ({ room_id, user_name }) => {
      console.log(room_id);
      console.log(user_name);
    });

    return () => socket?.off('new room');
  }, [socket]);

  const getRooms = useCallback(async () => {
    try {
      setIsLoading(true);
      const responseJson = await as.get('/rooms');
      setRooms(responseJson.rooms);
    } catch (error) {
      toast.error(error.message);
      console.log('🚨 useGetRooms Error', error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, rooms };
};

export default useGetRooms;
