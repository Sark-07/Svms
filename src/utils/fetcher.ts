import { ApiResponse } from '@/types/types';
import axios, { AxiosRequestConfig } from 'axios';

export const fetchData = async <T,>(
  url: string,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  options?: AxiosRequestConfig
) => {
  if (setLoading) {
    setLoading(true); // Start loading
  }

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION_TOKEN}`,
    },
    ...options,
  };

  try {
    const response = await axios.get<ApiResponse<T>>(url, config);
    if (setLoading) {
      setLoading(false); // Stop loading
    }
    if (response.data.apiResponseStatus === 1) {
      return { data: response.data.result, error: null };
    } else {
      return { data: null, error: response.data.message };
    }
  } catch (err: any) {
    if (setLoading){
      setLoading(false); // Stop loading in case of an error
    }
    return { data: null, error: err.message };
  }
};

export const postData = async <T,>(
  url: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  payload: object,
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
    const response = await axios.post<ApiResponse<T>>(url, payload, config);
    setLoading(false); // Stop loading
    if (response.data.apiResponseStatus === 1) {
      return { data: response.data.result, error: null };
    } else {
      return { data: null, error: response.data.message };
    }
  } catch (err: any) {
    setLoading(false); // Stop loading in case of an error
    return { data: null, error: err.message };
  }
};

