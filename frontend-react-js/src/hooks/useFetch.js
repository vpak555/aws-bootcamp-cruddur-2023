import { useEffect, useState } from "react";

const useFetch = (url, method = "GET", body = null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const options = {
          method,
        };

        if (body) {
          options.body = JSON.stringify(body);
        }

        const res = await fetch(url, options);

        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          throw res;
        }
      } catch (error) {
          setError(error);
          console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, isLoading, error };
};

export default useFetch;