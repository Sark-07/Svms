
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { Category, Denomination } from '@/types/types'
import { useState } from 'react'
import fetchData from '@/utils/fetcher'

const StampRequisition = () => {
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [denominationLoading, setDenominationLoading] = useState(false);
  const [denominations, setdenominations] = useState<Denomination[] | null>(null);
  const [denominationError, setDenominationError] = useState<string | null>(null);

  const handleCategoryDropdown = async () => {
    if (!categories) {
      const { data, error } = await fetchData<Category>(
        `${import.meta.env.VITE_SERVER_URL}StampMaster/GetCategoriesWFTTreasury`,
        setCategoryLoading
      );
      if (error) {
        console.error('Error fetching category data:', error);
      } else {
        setCategories(data);
      }
      setCategoryError(error);
    }
  };

  const handleDenominationDropdown = async (categoryId: number) => {
    const { data, error } = await fetchData<Denomination>(
      `${import.meta.env.VITE_SERVER_URL}StampMaster/GetDenominationWFTTreasuryAndCategory?catId=${categoryId}`,
      setDenominationLoading
    );
    if (error) {
      console.error('Error fetching denomination data:', error);
    } else {
      setdenominations(data);
    }
    setDenominationError(error);
  };




  return (
    <div className='w-full h-full md:px-8 py-4 flex flex-col gap-4'>
      <div>
        <h1 className='font-bold text-3xl'>Create New Stamp Requisition</h1>
      </div>
      <div className='mx-auto px-4 py-6 rounded border shadow-sm w-full flex flex-col gap-4'>
        <div className="flex gap-4 items-end">
          <div className='flex-1'>
            <Label htmlFor="category" className="block text-gray-600 font-medium mb-2">Select Category</Label>
            <Select onOpenChange={handleCategoryDropdown} onValueChange={(value) => handleDenominationDropdown(Number(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryLoading ? <p className="text-sm">Loading categories...</p> : (categoryError && <p className="text-red-500 text-xs">{categoryError}</p>)}
                {/* {categoryLoading && <p className="text-sm">Loading categories...</p>} */}
                {/* {categoryError && <p className="text-red-500 text-xs">{categoryError}</p>} */}
                {categories?.map((category) => (
                  <SelectItem key={category.stampCategoryId} value={String(category.stampCategoryId)}>
                    {category.stampCategory}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex-1'>
            <Label htmlFor="denomination" className="block text-gray-600 font-medium mb-2">Select Denomination</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Denomination" />
              </SelectTrigger>
              {denominationLoading ? <p className="text-sm">Loading denominations...</p> : (denominationError && <p className="text-red-500 text-xs">{denominationError}</p>)}
              {/* {denominationLoading && <p className="text-sm">Loading denominations...</p>} */}
              {/* {denominationError && <p className="text-red-500 text-xs">{denominationError}</p>} */}
              <SelectContent>
                {denominations && denominations.length > 0 ? (
                  denominations.map((denomination) => (
                    <SelectItem key={denomination.denominationId} value={String(denomination.denominationId)}>
                      {denomination.denomination}
                    </SelectItem>
                  ))
                ) : (
                  'No items found'
                )}
              </SelectContent>
            </Select>
          </div>
          <div className='flex-1'>
            <Label htmlFor="quantity" className="block text-gray-600 font-medium mb-2">Quantity</Label>
            <Input type="number" id="quantity" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className='flex-1'>
            <Label htmlFor="value" className="block text-gray-600 font-medium mb-2">Value</Label>
            <Input type="number" id="value" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className='flex-1'>
            <Label htmlFor="discount" className="block text-gray-600 font-medium mb-2">Discount</Label>
            <Input type="number" id="discount" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className='flex-1'>
            <Label htmlFor="tax" className="block text-gray-600 font-medium mb-2">Tax</Label>
            <Input type="number" id="tax" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div className='flex-1'>
            <Label htmlFor="net-amount" className="block text-gray-600 font-medium mb-2">Net Amount</Label>
            <Input type="text" id="net-amount" className="w-full px-3 py-2 border rounded-md" readOnly />
          </div>
          <div>
            <Button>Add</Button>
          </div>
        </div>
        <div className='w-full border rounded '>
          <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader className='bg-gray-100 h-12'>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="h-12">
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
              </TableRow>
              <TableRow className="h-12">
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
              </TableRow>
              <TableRow className="h-12">
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
              </TableRow>
              <TableRow className="h-12">
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
              </TableRow>
              <TableRow className="h-12">
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
              </TableRow>
              <TableRow className="h-12">
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
              </TableRow>
              <TableRow className="h-12">
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
                <TableCell>$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className='flex flex-col gap-4 w-full justify-start'>
          <h1 className='font-bold text-2xl'>Summary</h1>
          <div>
            <div className="flex gap-4 items-end w-full">
              <div className='flex-1'>
                <Label htmlFor="category" className="block text-gray-600 font-medium mb-2">Total Gross Amount</Label>
                <Input type='number' value={50000} className="w-full px-3 py-2 border rounded-md" disabled />
              </div>
              <div className='flex-1'>
                <Label htmlFor="denomination" className="block text-gray-600 font-medium mb-2">Total Discount Amount</Label>
                <Input type='number' value={50000} className="w-full px-3 py-2 border rounded-md" disabled />
              </div>
              <div className='flex-1'>
                <Label htmlFor="quantity" className="block text-gray-600 font-medium mb-2">Total Tax Amount</Label>
                <Input type="number" value={5000} className="w-full px-3 py-2 border rounded-md" disabled />
              </div>
              <div className='flex-1'>
                <Label htmlFor="value" className="block text-gray-600 font-medium mb-2">Total Net Amount</Label>
                <Input type="number" value={5000} className="w-full px-3 py-2 border rounded-md" disabled />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full flex justify-end'>
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StampRequisition