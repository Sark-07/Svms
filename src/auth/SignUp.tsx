import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import { z } from 'zod';
// import { zodResolver } from "@hookform/resolvers/zod"
import useFetch from '@/hooks/useFetch';
import { ApiResponse } from '@/types/types';
import { formatDate } from '@/utils/formatDate';

// Zod schema for form validation including file validation
const vendorDetailsSchema = z.object({
  vendorName: z.string().min(1, "Vendor Name is required"),
  panNumber: z.string().min(10, "Pan No must be exactly 10 characters").max(10, "Pan No must be exactly 10 characters"),
  licenseNo: z.string().min(5, "License Number is required and minimum 5 characters long"),
  phoneNumber: z.string().min(10, "Phone number must be exactly 10 digits").max(10, "Phone number must be exactly 10 digits"),
  address: z.string().min(1, "Address is required"),
  effectiveFrom: z.string().min(1, "Effective From date is required"),
  validUpto: z.string().min(1, "Valid Upto date is required"),
  vendorType: z.number().min(1, "Vendor Type is required"),
  treasury: z.string().length(3, 'Treasury is required'),
  vendorPanPhoto: z
    .instanceof(File)
    .refine((file) => file.size <= 1024 * 1024, "Pan file size must be less than 1MB")
    .refine((file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), "Pan file type must be JPEG, JPG or PNG"),
  vendorLicensePhoto: z
    .instanceof(File)
    .refine((file) => file.size <= 1024 * 1024, "License file size must be less than 1MB")
    .refine((file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), "License file type must be JPEG, JPG or PNG"),
  vendorPhoto: z
    .instanceof(File)
    .refine((file) => file.size <= 1024 * 1024, "Photo file size must be less than 1MB")
    .refine((file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), "Photo file type must be JPEG, JPG or PNG"),
});

interface VendorType {
  stampVendorId: string;
  vendorType: string;
  description: string;
}
interface Treasury {
  name: string;
  code: string;
}


const SignUp = () => {

  const { data: vendorTypes, loading: vendorTypeLoading, error: vendorTypeError } = useFetch<VendorType>(`${import.meta.env.VITE_SERVER_URL}StampMaster/GetALLStampVendorTypes`);
  const { data: treasuries, loading: treassuryLoading, error: treasuryError } = useFetch<Treasury>(`${import.meta.env.VITE_SERVER_URL}Master/get-treasuries`);
  const [formData, setFormData] = useState({
    vendorName: '',
    panNumber: '',
    licenseNo: '',
    phoneNumber: 0,
    address: '',
    effectiveFrom: '',
    validUpto: '',
    vendorType: 0,
    treasury: '',
    vendorPanPhoto: null,
    vendorLicensePhoto: null,
    vendorPhoto: null,
  });

  const [formErrors, setFormErrors] = useState<any>({});  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === 'file') {
      const files = e.target.files;
      if (files && files.length > 0) {
        setFormData((prev) => ({ ...prev, [id]: files[0] })); // Handle file input
      }
    } else {
      setFormData((prev) => ({ ...prev, [id]: value })); // Handle text input and select inputs
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = vendorDetailsSchema.safeParse(formData);

    if (!parsed.success) {
      const errors = parsed.error.format();
      setFormErrors(errors);
      return;
    }

    const formDataToSubmit = new FormData();
    formData.effectiveFrom = formatDate(formData.effectiveFrom)
    formData.validUpto = formatDate(formData.validUpto)
    for (const key in formData) {
      console.log((formData as any)['effectiveFrom']);
      
      formDataToSubmit.append(key, (formData as any)[key]);
    }
    try {
      const { data: response } = await axios.post<ApiResponse<boolean>>(
        `${import.meta.env.VITE_SERVER_URL}StampVendor/CreateStampVendor`,
        formDataToSubmit,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION_TOKEN}`,
          },
        }
      );
      if (response.apiResponseStatus == 1) {
        toast.success(response.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        })
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        })
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <Card className="mx-auto w-[40rem]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Vendor Details Entry</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-start">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="vendorName">Vendor Name</Label>
                <Input id="vendorName" placeholder="Enter Vendor Name" onChange={handleInputChange} />
                {formErrors.vendorName && <p className="text-red-500 text-xs">{formErrors.vendorName._errors[0]}</p>}
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="vendorPhoto">Upload Photo</Label>
                <Input id="vendorPhoto" type="file" accept=".jpg,.jpeg,.png" onChange={handleInputChange} />
                {formErrors.vendorPhoto && <p className="text-red-500 text-xs">{formErrors.vendorPhoto._errors[0]}</p>}
              </div>
            </div>
            <div className='flex gap-4 items-start'>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="pan-no">Pan No</Label>
                <Input id="panNumber" placeholder="Eg: ABCDE1234F" onChange={handleInputChange} />
                {formErrors.panNumber && <p className="text-red-500 text-xs">{formErrors.panNumber._errors[0]}</p>}
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="license-number">License Number</Label>
                <Input id="licenseNo" placeholder="Eg: LIC123457" onChange={handleInputChange} />
                {formErrors.licenseNo && <p className="text-red-500 text-xs">{formErrors.licenseNo._errors[0]}</p>}
              </div>
            </div>
            <div className='flex gap-4 items-start'>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="upload-pan">Upload Pan</Label>
                <Input id="vendorPanPhoto" type="file" accept=".jpg,.jpeg,.png" onChange={handleInputChange} />
                {formErrors.vendorPanPhoto && <p className="text-red-500 text-xs">{formErrors.vendorPanPhoto._errors[0]}</p>}
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="upload-license">Upload License</Label>
                <Input id="vendorLicensePhoto" type="file" accept=".jpg,.jpeg,.png" onChange={handleInputChange} />
                {formErrors.vendorLicensePhoto && <p className="text-red-500 text-xs">{formErrors.vendorLicensePhoto._errors[0]}</p>}
              </div>
            </div>
            <div className='flex gap-4 items-start'>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" placeholder="Eg: 1234567891" onChange={handleInputChange} />
                {formErrors.phoneNumber && <p className="text-red-500 text-xs">{formErrors.phoneNumber._errors[0]}</p>}
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Eg: 20, ABC Road. New Delhi." onChange={handleInputChange} />
                {formErrors.address && <p className="text-red-500 text-xs">{formErrors.address._errors[0]}</p>}
              </div>
            </div>
            <div className='flex gap-4 items-start'>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="effectiveFrom">Effective From</Label>
                <Input id="effectiveFrom" type="date" onChange={handleInputChange} />
                {formErrors.effectiveFrom && <p className="text-red-500 text-xs">{formErrors.effectiveFrom._errors[0]}</p>}
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="validUpto">Valid Upto</Label>
                <Input id="validUpto" type="date" onChange={handleInputChange} />
                {formErrors.validUpto && <p className="text-red-500 text-xs">{formErrors.validUpto._errors[0]}</p>}
              </div>
            </div>
            <div className='flex gap-4 items-start'>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="vendor-type">Vendor Type</Label>
                {vendorTypeLoading && <p className='text-sm mt-2'>Loading vendor types...</p>}
                {vendorTypeError && <p className='text-sm text-red-500'>Error loading vendor types: {vendorTypeError}</p>}
                {vendorTypes && (
                  <Select onValueChange={(value) => setFormData({ ...formData, vendorType: Number(value) })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Vendor Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendorTypes.map((vendorType) => (
                        <SelectItem key={vendorType.stampVendorId} value={vendorType.stampVendorId.toString()}>
                          {vendorType.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {formErrors.vendorType && <p className="text-red-500 text-xs">{formErrors.vendorType._errors[0]}</p>}
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="vendor-type">Treasury</Label>
                {treassuryLoading && <p className='text-sm mt-2'>Loading treasuries...</p>}
                {treasuryError && <p className='text-sm text-red-500 mt-2'>Error loading treasuries: {treasuryError}</p>}
                {vendorTypes && (
                  <Select onValueChange={(value) => setFormData({ ...formData, treasury: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Treasury" />
                    </SelectTrigger>
                    <SelectContent>
                      {treasuries?.map((treasury) => (
                        <SelectItem key={treasury.code} value={treasury.code}>
                          {treasury.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {formErrors.treasury && <p className="text-red-500 text-xs">{formErrors.treasury._errors[0]}</p>}
              </div>
            </div>
            <Button type="submit" className="py-5 w-full mt-4">
              Submit
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

export default SignUp;
