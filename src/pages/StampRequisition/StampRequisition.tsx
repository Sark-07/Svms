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
import { Loader2, Trash2 } from "lucide-react"
import { Category, Combination, Denomination, StampRequisitionItem, StampRequisitionPayload } from '@/types/types'
import { useState } from 'react'
import { fetchData, postData } from '@/utils/fetcher'
import { toast } from 'react-toastify'
import Summary from './Summary'
const StampRequisition = () => {
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [denominationLoading, setDenominationLoading] = useState(false);
  const [denominations, setdenominations] = useState<Denomination[] | null>(null);
  const [denominationError, setDenominationError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [denomination, setDenomination] = useState<number>(0)
  const [categoryId, setCategoryId] = useState<number>(0)
  const [denominationId, setDenominationId] = useState<number>(-1)
  const [quantity, setQuantity] = useState<number>(0)
  const [value, setValue] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [discountedAmount, setDiscountedAmount] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [netAmount, setNetAmount] = useState<number>(0);
  const [totalGrossAmount, setTotalGrossAmount] = useState<number>(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState<number>(0);
  const [totalTaxAmount, setTotalTaxAmount] = useState<number>(0);
  const [totalNetAmount, setTotalNetAmount] = useState<number>(0);
  const [tableData, setTableData] = useState<StampRequisitionItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
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

  const getCombinationIdFromCategoryIdAndDenominationId = async (categoryId: number, denominationId: number) => {
    const { data, error } = await fetchData<Combination>(
      `${import.meta.env.VITE_SERVER_URL}StampMaster/GetCombinationIdFromCategoryDenominationLabel?categoryId=${categoryId}&denominationId=${denominationId}`);
    if (error) {
      toast.error(error);
    } else {
      if (data) {
        return { combinationId: data.stampCombinationId, noLabelPerSheet: data.noLabelPerSheet }
      }
    }
  };

  const getDiscount = async (stampCategoryId: number, denomination: number, vendorType: number = 2) => {
    const { data, error } = await fetchData<number>(
      `${import.meta.env.VITE_SERVER_URL}StampMaster/GetDiscount?vendorTypeId=${vendorType}&stampCategoryId=${stampCategoryId}&denomination=${denomination}`
    );
    if (error) {
      toast.error(error)
    } else {
      setDiscount(data);
    }
  }

  const handleQuantityChange = (quantity: number) => {
    if (quantity < 1) {
      toast.warn(`Quantity can not be less than 1`)
      setQuantity(1)
    } else {
      setQuantity(quantity);
      const currentValue = parseFloat((quantity * denomination).toFixed(3));
      setValue(currentValue);
      const currentDiscountedAmount = parseFloat((currentValue * (discount / 100)).toFixed(3));
      setDiscountedAmount(currentDiscountedAmount);
      const currentTax = parseFloat((currentDiscountedAmount * 0.1).toFixed(3));
      setTax(currentTax);
      setNetAmount(parseFloat((currentValue + currentTax - currentDiscountedAmount).toFixed(3)));
    }
  }

  const addItems = async () => {
    if (category && denomination) {
      if (!quantity) {
        toast.warn("Quantity should be at least 1")
        return
      }
      const isDenominationAdded = tableData.some(item => item.denomination === denomination);
      if (isDenominationAdded) {
        toast.warn(`The selected denomination is already added for the category: ${category}`);
        return;
      }
      const { combinationId = 0, noLabelPerSheet = 0 } = await getCombinationIdFromCategoryIdAndDenominationId(categoryId, denominationId) || {};
      const obj: StampRequisitionItem = {
        combinationId: combinationId,
        noLabelPerSheet: noLabelPerSheet,
        category,
        description,
        denomination,
        quantity,
        value,
        discountedAmount,
        tax,
        netAmount
      };

      // ------------------------------------- Total Summary ------------------------------------------
      setTotalGrossAmount(prev => prev + value);
      setTotalDiscountAmount(prev => prev + discountedAmount);
      setTotalTaxAmount(prev => prev + tax);
      setTotalNetAmount(prev => prev + netAmount);

      // ------------------------------------- Reset ------------------------------------------
      setTableData(prevTableData => [...prevTableData, obj]);
      setQuantity(0);
      setValue(0);
      setDiscountedAmount(0);
      setTax(0);
      setNetAmount(0);
    } else {
      toast.warning("Please choose a category and denomination first")
    }
  }
  const handleAction = (requisition: StampRequisitionItem) => {
    setTableData(tableData.filter((item) => item.combinationId !== requisition.combinationId));
    setTotalGrossAmount(prev => prev - requisition.value);
    setTotalDiscountAmount(prev => prev - requisition.discountedAmount);
    setTotalTaxAmount(prev => prev - requisition.tax);
    setTotalNetAmount(prev => prev - requisition.netAmount);
  }

  const submitRequisition = async () => {
    setIsSubmitting(true)
    if (tableData.length > 0) {
      const chilData = tableData.map((item) => {
        return {
          stampCombinationId: item.combinationId,
          quantity: item.quantity,
          labelPerSheet: item.noLabelPerSheet,
          grossAmount: item.value,
          netAmount: item.netAmount,
          taxAmount: item.tax,
          discountAmount: item.discountedAmount
        }
      })
      const payload: StampRequisitionPayload = {
        vendorId: 1227,
        totalGrossAmount,
        totalDiscountAmount,
        totalTaxAmount,
        totalNetAmount,
        childData: chilData
      }
      const { data, error } = await postData(`${import.meta.env.VITE_SERVER_URL}StampRequisition/CreateStampRequisition`, setIsSubmitting, payload)
      if (error) {
        toast.error(error)
      } else {
        toast.success(data.message);
      }
    } else {
      toast.warn("No Items Added")
    }
    setIsSubmitting(false)
  }

  return (
    <div className='w-full h-full md:px-8 py-4 flex flex-col gap-4'>
      <div>
        <h1 className='font-bold text-3xl'>Create New Stamp Requisition</h1>
      </div>
      <div className='mx-auto px-4 py-6 rounded border shadow-sm w-full flex flex-col gap-4'>
        <div className="flex gap-4 items-end">
          <div className='flex-1'>
            <Label htmlFor="category" className="block text-gray-600 font-medium mb-2">Select Category</Label>
            <Select disabled={tableData.length > 0} onOpenChange={handleCategoryDropdown} onValueChange={(value) => {
              setCategoryId(JSON.parse(value).categoryId)
              setCategory(JSON.parse(value).category)
              setDescription(JSON.parse(value).description)
              handleDenominationDropdown(JSON.parse(value).categoryId)
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryLoading ? <p className="text-sm">Loading categories...</p> : (categoryError && <p className="text-red-500 text-xs">{categoryError}</p>)}
                {categories?.map((category) => (
                  <SelectItem key={category.stampCategoryId} value={JSON.stringify({ categoryId: category.stampCategoryId, category: category.stampCategory, description: category.description })}>
                    {category.stampCategory}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex-1'>
            <Label htmlFor="denomination" className="block text-gray-600 font-medium mb-2">Select Denomination</Label>
            <Select onValueChange={(value) => {
              setDenominationId(JSON.parse(value).denominationId)
              setDenomination(JSON.parse(value).denomination)
              getDiscount(categoryId, JSON.parse(value).denomination)
              setValue(0)
              setQuantity(0)
              setDiscountedAmount(0)
              setTax(0)
              setNetAmount(0)
            }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Denomination" />
              </SelectTrigger>
              {denominationLoading ? <p className="text-sm">Loading denominations...</p> : (denominationError && <p className="text-red-500 text-xs">{denominationError}</p>)}
              <SelectContent>
                {denominations && denominations.length > 0 ? (
                  denominations.map((denomination) => (
                    <SelectItem key={denomination.denominationId} value={JSON.stringify({ denominationId: denomination.denominationId, denomination: denomination.denomination })}>
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
            <Input type="number" id="quantity" className="w-full px-3 py-2 border rounded-md" placeholder='Eg: 500' value={quantity} onChange={(e) => handleQuantityChange(Number(e.target.value))} />
          </div>
          <div className='flex-1'>
            <Label htmlFor="value" className="block text-gray-600 font-medium mb-2">Value</Label>
            <Input type="number" value={value} id="value" className="w-full px-3 py-2 border rounded-md" disabled />
          </div>
          <div className='flex-1'>
            <Label htmlFor="discount" className="block text-gray-600 font-medium mb-2">Discount</Label>
            <Input type="number" value={discountedAmount} id="discount" className="w-full px-3 py-2 border rounded-md" disabled />
          </div>
          <div className='flex-1'>
            <Label htmlFor="tax" className="block text-gray-600 font-medium mb-2">Tax</Label>
            <Input type="number" value={tax} id="tax" className="w-full px-3 py-2 border rounded-md" disabled />
          </div>
          <div className='flex-1'>
            <Label htmlFor="net-amount" className="block text-gray-600 font-medium mb-2">Net Amount</Label>
            <Input type="number" value={netAmount} id="net-amount" className="w-full px-3 py-2 border rounded-md disabled" disabled />
          </div>
          <div>
            <Button onClick={addItems}>Add</Button>
          </div>
        </div>
        <div className='w-full border rounded '>
          <Table>
            <TableHeader className='bg-gray-100 h-12'>
              <TableRow>
                <TableHead className="w-[100px]">Serial No</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Denomination</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Net Amount</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                tableData.length > 0 ? (
                  tableData.map((item, index: number) => {
                    return (
                      <TableRow className="h-12" key={item.combinationId}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.denomination}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell>{item.discountedAmount}</TableCell>
                        <TableCell>{item.tax}</TableCell>
                        <TableCell>{item.netAmount}</TableCell>
                        <TableCell><Button onClick={() => handleAction(item)}><Trash2 /></Button></TableCell>
                      </TableRow>
                    )
                  })
                ) : <TableRow className="h-12"><TableCell className='font-medium text-xl text-center'>No Items</TableCell></TableRow>
              }
            </TableBody>
          </Table>
        </div>
        <Summary
          totalGrossAmount={totalGrossAmount}
          totalDiscountAmount={totalDiscountAmount}
          totalTaxAmount={totalTaxAmount}
          totalNetAmount={totalNetAmount}
        />
        <div className='w-full flex justify-end'>
          <Button disabled={isSubmitting} onClick={submitRequisition}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StampRequisition