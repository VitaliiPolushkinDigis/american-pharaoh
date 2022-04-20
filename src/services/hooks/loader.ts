import { useState, useMemo, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);
  const [reqCounter, setReqCounter] = useState(0);
  const [resCounter, setResCounter] = useState(0);

  const interceptors = useMemo(() => {
    const inc = () => {
      setCounter((counter) => counter + 1);
      setReqCounter((counter) => counter + 1);
    };
    const dec = () => {
      setCounter((counter) => counter - 1);
      setResCounter((counter) => counter + 1);
    };

    return {
      request: (config: AxiosRequestConfig) => (inc(), config),
      response: (response: AxiosResponse) => (dec(), response),
      error: (error: AxiosError) => (dec(), Promise.reject(error)),
    };
  }, []); // create the interceptors

  useEffect(() => {
    // add request interceptors
    const reqInterceptor = axios.interceptors.request.use(interceptors.request, interceptors.error);
    // add response interceptors
    const resInterceptor = axios.interceptors.response.use(
      interceptors.response,
      interceptors.error,
    );
    return () => {
      // remove all intercepts when done
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);

  return {
    reqCounter,
    resCounter,
    progress: Math.trunc((resCounter / reqCounter || 0) * 100),
    loading: counter > 0,
  };
};
