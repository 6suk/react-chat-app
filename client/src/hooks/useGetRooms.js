import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import APIService from '../utils/APIService';

const useGetRooms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const as = new APIService();

  useEffect(() => {
    const getRooms = async () => {
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
    };

    getRooms();
  }, []);

  return { isLoading, rooms };
};

export default useGetRooms;
