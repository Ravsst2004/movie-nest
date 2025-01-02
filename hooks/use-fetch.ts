import { useState, useEffect, useMemo } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = useMemo(
    () => async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          setError(result);
        }
      } catch (error: string | unknown) {
        if (error instanceof Error) {
          setError("Unknown error occurred");
        }
      }
    },
    [url]
  );

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return { data, error };
};

export default useFetch;
