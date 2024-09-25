import { ApiResponse } from '@/types/types';
import axios, { AxiosRequestConfig } from 'axios';

const fetchData = async <T,>(
  url: string, 
  setLoading: React.Dispatch<React.SetStateAction<boolean>>, 
  options?: AxiosRequestConfig
) => {
  setLoading(true); // Start loading

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION_TOKEN}`,
    },
    ...options,
  };

  try {
    const response = await axios.get<ApiResponse<T>>(url, config);
    setLoading(false); // Stop loading
    if (response.data.apiResponseStatus === 1) {
      return { data: response.data.result, error: null };
    } else {
      return { data: null, error: 'Failed to fetch data' };
    }
  } catch (err: any) {
    setLoading(false); // Stop loading in case of an error
    return { data: null, error: err.message };
  }
};

export default fetchData;
