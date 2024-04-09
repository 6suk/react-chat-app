import { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';

import { useFetch } from '@context/FetchContext';
import { useSocketContext } from '@context/SocketContext';

const useGetUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const fm = useFetch();
  const { socket } = useSocketContext();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    socket?.on('new user', id => {
      if (users.length === 0) {
        getUsers();
        return;
      }
      setUsers([...users, id]);
    });

    socket?.on('removed user', id => {
      if (users.length === 0) {
        getUsers();
        return;
      }
      setUsers(users.filter(user => user.id !== id));
    });

    return () => {
      socket?.off('new user');
      socket?.off('removed user');
    };
  }, [socket, users]);

  const getUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fm.get('/user');
      setUsers(response.users);
    } catch (error) {
      console.log('🚨 useGetUsers Error! : ', error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, users };
};

export default useGetUsers;
