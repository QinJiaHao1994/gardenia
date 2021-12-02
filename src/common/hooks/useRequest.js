import { useState } from "react";

const useRequest = (api) => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle"); //'idle' | 'loading' | 'succeeded' | 'failed'

  const request = async (...args) => {
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
  };

  const reset = () => {
    setValue(null);
    setError(null);
    setStatus("idle");
  };

  return [
    request,
    {
      reset,
      value,
      error,
      status,
    },
  ];
};

export default useRequest;
