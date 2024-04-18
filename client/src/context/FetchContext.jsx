import { createContext, useContext, useEffect, useState } from 'react';

import url from '@/env.config';

import useErrorHandler from '@hooks/useErrorHandler';
import { useBoundStore } from '@store/useBoundStore';

import Network from '@utils/Network';
import NetworkError from '@utils/NetworkError';

export const FetchContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFetch = () => useContext(FetchContext);

export const FetchContextProvider = ({ children }) => {
  const [fetchInstance, setFetchInstance] = useState(null);
  const { refreshToken, handle403Error, handle404Error } = useErrorHandler();

  const baseURL = url.api;
  const initOptions = {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };

  useEffect(() => {
    const networkError = new NetworkError({
      refreshToken,
      handle403Error,
      handle404Error,
    });

    const network = new Network({
      baseURL,
      initOptions,
      networkError,
    });

    setFetchInstance(network);
    useBoundStore.setState(() => ({ fetchInstance: network }));

    // Cleanup
    return () => {};
  }, []);

  if (!fetchInstance) return null;

  return (
    <FetchContext.Provider value={fetchInstance}>
      {children}
    </FetchContext.Provider>
  );
};
