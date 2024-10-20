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
  noLabelPerSheet: number
  category: string;
  description: string;
  denomination: number;
  quantity: number
  value: number;
  discountedAmount: number;
  tax: number;
  netAmount: number;
}

interface ChildData {
  stampCombinationId: number;
  quantity: number;
  labelPerSheet: number;
  grossAmount: number;
  netAmount: number;
  taxAmount: number;
  discountAmount: number;
}

export type StampRequisitionPayload = {
  vendorId: number;
  totalGrossAmount: number;
  totalNetAmount: number;
  totalTaxAmount: number;
  totalDiscountAmount: number;
  childData: ChildData[];
}
