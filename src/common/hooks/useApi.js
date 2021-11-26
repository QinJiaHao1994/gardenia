import { useState } from "react";

const useApi = (api) => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const wrappedApi = async (...args) => {
    setError(null);
    setLoading(true);
    try {
      const data = await api(...args);
      setValue(data);
      setError(null);
      return data;
    } catch (error) {
      setValue(null);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [
    {
      value,
      error,
      loading,
    },
    wrappedApi,
  ];
};

export default useApi;
