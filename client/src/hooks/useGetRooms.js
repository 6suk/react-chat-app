import { useEffect, useState } from 'react';
import ApiService from '../utils/ApiService';
import toast from 'react-hot-toast';

const useGetRooms = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const as = new ApiService();

  useEffect(() => {
    const getRooms = async () => {
      try {
        setIsLoading(true);
        const responseJson = await as.fetchGet('/rooms');
        setRooms(responseJson.rooms);
      } catch (error) {
        console.log('🚨 useGetRooms Error', error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getRooms();
  }, []);

  return { isLoading, rooms };
};

export default useGetRooms;
