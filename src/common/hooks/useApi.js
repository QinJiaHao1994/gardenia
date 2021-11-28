import { useState, useCallback } from "react";

const useApi = (api) => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const wrappedApi = useCallback(
    async (...args) => {
      setError(null);
      setLoading(true);
      setFinished(false);
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
        setFinished(true);
        setLoading(false);
      }
    },
    [api]
  );

  return [
    {
      value,
      error,
      loading,
      finished,
    },
    wrappedApi,
  ];
};

export default useApi;
