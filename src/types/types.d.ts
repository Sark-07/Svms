export type ApiResponse<T> = {
  apiResponseStatus: number;
  message: string;
  // result: T[];
  result: any;
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

export type Combination = {
  denomination: number;
  description: string;
  noLabelPerSheet: number;
  stampCategory1: string;
  stampCategoryId: number;
  stampCombinationId: number;
}
export type StampRequisitionItem = {
  combinationId: number;
  category: string;
  description: string;
  denomination: number;
  value: number;
  discount: number;
  tax: number;
  netAmount: number;
}
