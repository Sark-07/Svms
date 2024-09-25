export type ApiResponse<T> = {
    apiResponseStatus: number;
    message: string;
    result: T[];
  };
  export type VendorType = {
    stampVendorId: string;
    vendorType: string;
    description: string;
  }
  export type Treasury = {
    name: string;
    code: string;
  }