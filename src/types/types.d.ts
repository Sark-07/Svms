export type ApiResponse<T> = {
    apiResponseStatus: number;
    message: string;
    result: T[];
  };