import * as React from 'react';
import axios, { AxiosError } from 'axios';

interface ClientRequest {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: {};
  onSuccess?: Function;
}

const baseClient = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',
});

const useRequest = ({ url, method, body, onSuccess }: ClientRequest) => {
  const [errors, setErrors] = React.useState<AxiosError | null>(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);

      const response = await baseClient[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrors(err?.response?.data);
      } else {
        console.log(err);
      }
    }
  };

  return { doRequest, errors };
};

export default useRequest;
