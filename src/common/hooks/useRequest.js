import { useState, useMemo, useCallback } from "react";

const useRequest = (api) => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle"); //'idle' | 'loading' | 'succeeded' | 'failed'

  // const wrappedRequest = async (...args) => {
  //   return await request(...args);
  // };

  const request = useCallback(
    async (...args) => {
      setStatus("loading");
      try {
        const data = await api(...args);
        setValue(data);
        setError(null);
        setStatus("succeeded");
        return data;
      } catch (error) {
        setValue(null);
        setError(error && error.message);
        setStatus("failed");
        throw error;
      }
    },
    [api]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setValue(null);
    setError(null);
  }, []);

  const response = useMemo(
    () => ({
      reset,
      value,
      error,
      status,
    }),
    [reset, value, error, status]
  );

  return [request, response];
};

export default useRequest;
