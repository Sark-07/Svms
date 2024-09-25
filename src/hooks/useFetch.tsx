import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '@/types/types';
const useFetch = <T,>(url: string, options?: AxiosRequestConfig) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION_TOKEN}`,
        },
        ...options,
      };

      try {
        const response = await axios.get<ApiResponse<T>>(url, config);
        if (response.data.apiResponseStatus === 1) {
          setData(response.data.result); // Set only the result array
        } else {
          setError('Failed to fetch data');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;
