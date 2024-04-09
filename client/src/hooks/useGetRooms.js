import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useFetch } from '@context/FetchContext';
import { useSocketContext } from '@context/SocketContext';
import useRoomStore from '@store/useRoomStore';

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

    socket?.on('new join', ({ id, joinedUsers }) => {
      console.log(id);
      console.log(joinedUsers);
      const roomIndex = rooms.findIndex(room => room.id === id);

      if (roomIndex !== -1) {
        let getRooms = [...rooms];
        const updateRoom = { ...getRooms[roomIndex], users: joinedUsers };
        getRooms[roomIndex] = updateRoom;

        setRooms(getRooms);

        if (currentRoom.id === id) {
          setCurrentRoom(updateRoom);
        }
      }
    });

    return () => {
      socket?.off('removed room');
      socket?.off('new join');
    };
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
