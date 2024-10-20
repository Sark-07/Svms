import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
type Props = {
  totalGrossAmount: number;
  totalDiscountAmount: number;
  totalTaxAmount: number;
  totalNetAmount: number;
}

const Summary = ({ totalGrossAmount, totalDiscountAmount, totalTaxAmount, totalNetAmount }: Props) => {
  return (
    <div className='flex flex-col gap-4 w-full justify-start'>
      <h1 className='font-bold text-2xl'>Summary</h1>
      <div>
        <div className="flex gap-4 items-end w-full">
          <div className='flex-1'>
            <Label htmlFor="total-gross-amount" className="block text-gray-600 font-medium mb-2">Total Gross Amount</Label>
            <Input type='number' value={totalGrossAmount} id="total-gross-amount" className="w-full px-3 py-4 border rounded-md" disabled />
          </div>
          <div className='flex-1'>
            <Label htmlFor="total-discount-amount" className="block text-gray-600 font-medium mb-2">Total Discount Amount</Label>
            <Input type='number' value={totalDiscountAmount} id="total-discount-amount" className="w-full px-3 py-4 border rounded-md" disabled />
          </div>
          <div className='flex-1'>
            <Label htmlFor="total-tax-amount" className="block text-gray-600 font-medium mb-2">Total Tax Amount</Label>
            <Input type="number" value={totalTaxAmount} id="total-tax-amount" className="w-full px-3 py-4 border rounded-md" disabled />
          </div>
          <div className='flex-1'>
            <Label htmlFor="total-net-amount" className="block text-gray-600 font-medium mb-2">Total Net Amount</Label>
            <Input type="number" value={totalNetAmount} id="total-net-amount" className="w-full px-3 py-4 border rounded-md" disabled />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary