import { useState, useCallback } from "react";
import { isFunc } from "../utils";

const useFetch = (defaultApi) => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const wrappedFetch = useCallback(
    async (...args) => {
      const [first, ...rest] = args;

      const fetch = isFunc(first) ? first : defaultApi;
      const params = isFunc(first) ? rest : args;

      setError(null);
      setLoading(true);
      setFinished(false);
      try {
        const data = await fetch(...params);
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
    [defaultApi]
  );

  return [
    {
      value,
      error,
      loading,
      finished,
    },
    wrappedFetch,
  ];
};

export default useFetch;
