import { useEffect, useState } from 'react';

const useApi = <T>(baseUrl: string, queryParams = '') => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}${queryParams}`,
        );
        const formattedResponse = await response.json();
        setData(formattedResponse as T);
      } catch (err: any) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [baseUrl, queryParams]);

  return { loading, error, data };
};

export default useApi;
