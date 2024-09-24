import React from 'react'
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2 } from "lucide-react"
type Props = {}

const StampRequisition = (props: Props) => {
  return (
    <div className='w-full h-full md:px-8 py-4 flex flex-col gap-4'>
      <div>
        <h1 className='font-bold text-3xl'>Create New Stamp Requisition</h1>
      </div>
      <div className='mx-auto px-4 py-6 rounded border shadow-sm w-full flex flex-col gap-4'>
        <div className="flex gap-4 items-end">
          <div className='flex-1'>
            <Label htmlFor="category" className="block text-gray-600 font-medium mb-2">Select Category</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

          </div>
          <div className='flex-1'>
            <Label htmlFor="denomination" className="block text-gray-600 font-medium mb-2">Select Denomination</Label>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
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
                <Label htmlFor="category" className="block text-gray-600 font-medium mb-2">Total Value</Label>
                <Input type='number' value={50000} className="w-full px-3 py-2 border rounded-md" disabled />
              </div>
              <div className='flex-1'>
                <Label htmlFor="denomination" className="block text-gray-600 font-medium mb-2">Total Discount</Label>
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