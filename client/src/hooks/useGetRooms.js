import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useFetch } from '../context/FetchContext';
import { useSocketContext } from '../context/SocketContext';
import useRoomStore from '../store/useRoomStore';

const useGetRooms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const { socket } = useSocketContext();
  const fs = useFetch();
  const { currentRoom, setCurrentRoom } = useRoomStore();

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
    // socket?.on('new join', ({ room_id, user_name }) => {
    //   console.log(room_id);
    //   console.log(user_name);
    // });

    return () => socket?.off('new room');
  }, [socket, rooms]);

  useEffect(() => {
    socket?.on('removed room', removedRoomid => {
      if (rooms.length === 0) {
        getRooms();
        return;
      }

      const removedRoom = rooms.filter(
        room => !removedRoomid.includes(room.id)
      );
      setRooms(removedRoom);

      if (removedRoomid.includes(currentRoom?.id)) {
        setCurrentRoom(null);
        toast.error('참여 중인 방이 삭제 되었습니다!');
      }
    });

    return () => socket?.off('removed room');
  }, [socket, currentRoom?.id, rooms]);

  const getRooms = useCallback(async () => {
    try {
      setIsLoading(true);
      const responseJson = await fs.get('/rooms');
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
