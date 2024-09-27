import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ApiResponse, Treasury, VendorType } from '@/types/types';
import { formatDate } from '@/utils/formatDate';
import fetchData from '@/utils/fetcher';

// Zod schema for form validation including file validation
const vendorDetailsSchema = z.object({
  vendorName: z.string().min(1, 'Vendor Name is required'),
  panNumber: z.string().length(10, 'Pan No must be exactly 10 characters').regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
  licenseNo: z.string().min(5, 'License Number is required and minimum 5 characters long'),
  phoneNumber: z.string().length(10, 'Phone number must be exactly 10 digits').regex(/^[6-9]\d{9}$/, 'Invalid phone number format'),
  address: z.string().min(1, 'Address is required'),
  effectiveFrom: z.string().min(1, 'Effective From date is required'),
  validUpto: z.string().min(1, 'Valid Upto date is required'),
  vendorType: z.string().min(1, 'Vendor Type is required'),
  treasury: z.string().min(1, 'Treasury is required'),
  vendorPanPhoto: z
  .instanceof(File)
  .refine((file: File) => !!file, "File is required") // Ensure a file exists
  .refine((file) => file.size <= 1024 * 1024, 'Pan file size must be less than 1MB')
  .refine((file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), 'Pan file type must be JPEG, JPG, or PNG'),
vendorLicensePhoto: z
  .instanceof(File)
  .refine((file: File) => !!file, "File is required") // Ensure a file exists
  .refine((file) => file.size <= 1024 * 1024, 'License file size must be less than 1MB')
  .refine((file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), 'License file type must be JPEG, JPG, or PNG'),
vendorPhoto: z
  .instanceof(File)
  .refine((file: File) => !!file, "File is required") // Ensure a file exists
  .refine((file) => file.size <= 1024 * 1024, 'Photo file size must be less than 1MB')
  .refine((file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type), 'Photo file type must be JPEG, JPG, or PNG'),
});

type FormFields = z.infer<typeof vendorDetailsSchema>;

const SignUp = () => {
  const [vendorLoading, setVendorLoading] = useState(false);
  const [vendorData, setVendorData] = useState<VendorType[] | null>(null);
  const [vendorError, setVendorError] = useState<string | null>(null);
  const [treasuryLoading, setTreasuryLoading] = useState(false);
  const [treasuryData, setTreasuryData] = useState<Treasury[] | null>(null);
  const [treasuryError, setTreasuryError] = useState<string | null>(null);

  const {
    register,
    setValue,
    trigger,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(vendorDetailsSchema) });

  // File handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof FormFields) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(fieldName, file);
    }
  };

  const handleVendorDropdown = async () => {
    if (!vendorData) {
      const { data, error } = await fetchData<VendorType>(
        `${import.meta.env.VITE_SERVER_URL}StampMaster/GetALLStampVendorTypes`,
        setVendorLoading
      );
      if (error) {
        setVendorError(error);
        console.error('Error fetching vendor data:', error);
      } else {
        setVendorData(data);
        setVendorError(error);
      }
    }
  };

  const handleTreasuryDropdown = async () => {
    if (!treasuryData) {
      const { data, error } = await fetchData<Treasury>(
        `${import.meta.env.VITE_SERVER_URL}Master/get-treasuries`,
        setTreasuryLoading
      );
      if (error) {
        setTreasuryError(error);
        console.error('Error fetching treasury data:', error);
      } else {
        setTreasuryData(data);
        setTreasuryError(error);
      }
    }
  };

  const onSubmit: SubmitHandler<FormFields> = async (formData: FormFields) => {
    try {
      const formDataToSubmit = new FormData();
      formData.effectiveFrom = formatDate(formData.effectiveFrom);
      formData.validUpto = formatDate(formData.validUpto);
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSubmit.append(key, value);
        } else {
          formDataToSubmit.append(key, value as string);
        }
      });

      // Now submit the FormData
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

      // Handle the response
      if (response.apiResponseStatus === 1) {
        toast.success(response.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
      } else {
        setError('root', { message: response.message });
        toast.error(response.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
      }
    } catch (error) {
      setError('root', { message: 'Error submitting form' });
      console.error('Error submitting form', error);
    }
  };

  return (
    <Card className="mx-auto w-[40rem]">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Vendor Details Entry</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Vendor Name & Photo */}
            <div className="flex gap-4 items-start">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="vendorName">Vendor Name</Label>
                <Input {...register('vendorName')} id="vendorName" placeholder="Enter Vendor Name" />
                {errors.vendorName && <p className="text-red-500 text-xs">{errors.vendorName.message}</p>}
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="vendorPhoto">Upload Photo</Label>
                <Input id="vendorPhoto" name='vendorPhoto' type="file" accept=".jpg,.jpeg,.png" onChange={(e) => { handleFileChange(e, 'vendorPhoto'), trigger('vendorPhoto') }} />
                {errors.vendorPhoto && <p className="text-red-500 text-xs">{String(errors.vendorPhoto.message)}</p>}
              </div>
            </div>

            {/* PAN & License Number */}
            <div className="flex gap-4 items-start">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="panNumber">Pan No</Label>
                <Input {...register('panNumber')} id="panNumber" placeholder="Eg: ABCDE1234F" />
                {errors.panNumber && <p className="text-red-500 text-xs">{errors.panNumber.message}</p>}
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="licenseNo">License Number</Label>
                <Input {...register('licenseNo')} id="licenseNo" placeholder="Eg: LIC123457" />
                {errors.licenseNo && <p className="text-red-500 text-xs">{errors.licenseNo.message}</p>}
              </div>
            </div>

            {/* PAN & License Photo */}
            <div className="flex gap-4 items-start">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="vendorPanPhoto">Upload Pan</Label>
                <Input id="vendorPanPhoto" type="file" accept=".jpg,.jpeg,.png" onChange={(e) => { handleFileChange(e, 'vendorPanPhoto'), trigger('vendorPanPhoto') }} />
                {errors.vendorPanPhoto && <p className="text-red-500 text-xs">{String(errors.vendorPanPhoto.message)}</p>}
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="vendorLicensePhoto">Upload License</Label>
                <Input id="vendorLicensePhoto" type="file" accept=".jpg,.jpeg,.png" onChange={(e) => { handleFileChange(e, 'vendorLicensePhoto'), trigger('vendorLicensePhoto') }} />
                {errors.vendorLicensePhoto && <p className="text-red-500 text-xs">{String(errors.vendorLicensePhoto.message)}</p>}
              </div>
            </div>

            {/* Phone Number & Address */}
            <div className="flex gap-4 items-start">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input {...register('phoneNumber')} id="phoneNumber" placeholder="Enter Phone Number" />
                {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="address">Address</Label>
                <Input {...register('address')} id="address" placeholder="Enter Address" />
                {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
              </div>
            </div>

            {/* Effective From & Valid Upto */}
            <div className="flex gap-4 items-start">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="effectiveFrom">Effective From</Label>
                <Input {...register('effectiveFrom')} id="effectiveFrom" type="date" />
                {errors.effectiveFrom && <p className="text-red-500 text-xs">{errors.effectiveFrom.message}</p>}
              </div>
              <div className="grid gap-2 flex-1">
                <Label htmlFor="validUpto">Valid Upto</Label>
                <Input {...register('validUpto')} id="validUpto" type="date" />
                {errors.validUpto && <p className="text-red-500 text-xs">{errors.validUpto.message}</p>}
              </div>
            </div>

            {/* Vendor Type & Treasury */}
            <div className="flex gap-4 items-start">
              <div className="grid gap-2 flex-1">
                <Label htmlFor="vendorType">Vendor Type</Label>
                <Select onOpenChange={handleVendorDropdown} onValueChange={(value) => { setValue('vendorType', value), trigger('vendorType') }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vendor Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendorData?.map((vendorType) => (
                      <SelectItem key={vendorType.stampVendorId} value={String(vendorType.stampVendorId)}>
                        {vendorType.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {vendorLoading && <p className="text-sm">Loading vendor types...</p>}
                {vendorError && <p className="text-red-500 text-xs">{vendorError}</p>}
                {errors.vendorType && <p className="text-red-500 text-xs">{errors.vendorType.message}</p>}
              </div>

              <div className="grid gap-2 flex-1">
                <Label htmlFor="treasury">Treasury</Label>
                <Select onOpenChange={handleTreasuryDropdown} onValueChange={(value) => { setValue('treasury', value), trigger('treasury') }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Treasury" />
                  </SelectTrigger>
                  <SelectContent>
                    {treasuryData?.map((treasury) => (
                      <SelectItem key={treasury.code} value={String(treasury.code)}>
                        {treasury.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {treasuryLoading && <p className="text-sm">Loading treasuries...</p>}
                {treasuryError && <p className="text-red-500 text-xs">{treasuryError}</p>}
                {errors.treasury && <p className="text-red-500 text-xs">{errors.treasury.message}</p>}
              </div>
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className='mt-4 w-full'>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          {errors.root?.message && <p className="text-red-500 text-xs mt-2">{errors.root.message}</p>}
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
