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

export type Category = {
  stampCategoryId: number;
  stampCategory: string;
  description: string;
}

export type Denomination = {
  denominationId: number;
  denomination: number
}

