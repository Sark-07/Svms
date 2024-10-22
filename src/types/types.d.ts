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

// src/types/RequisitionHistory.ts
export type RequisitionHistory = {
  id: number;
  requisitionNo: string;
  requisitionDate: string
  vendorName: string;
  vendorTypeId: number;
  licenseNo: string;
  grossAmount: number;
  discountAmount: number;
  taxAmount: number;
  netAmount: number;
  statusCode: number;
  status: string;
  childData: RequisitionHistoryChildData[];
}

export type RequisitionHistoryChildData = {
  id: number;
  stampCombinationId: number;
  stampCategory: string;
  description: string;
  stampCategoryId: number;
  denomination: number;
  denominationId: number;
  quantity: number;
  labelPerSheet: number;
  labelPerSheetId: number;
  grossAmount: number;
  netAmount: number;
  taxAmount: number;
  discountAmount: number;
}