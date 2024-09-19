import React from 'react'

type Props = {}

const StampRequisition = (props: Props) => {
  return (
    <div className='w-full h-full md:px-8 py-4 flex flex-col gap-4'>
      <div>
        <h1 className='font-bold text-3xl'>Create New Stamp Requisition</h1>
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Select Category</label>
            <select id="category" className="w-full px-3 py-2 border rounded-md">
              <option value="">Select Category</option>
              {/* Add options here */}
            </select>
          </div>
          <div>
            <label htmlFor="denomination" className="block text-gray-700 font-bold mb-2">Select Denomination</label>
            <select id="denomination" className="w-full px-3 py-2 border rounded-md">
              <option value="">Select Denomination</option>
              {/* Add options here */}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">Quantity</label>
            <input type="number" id="quantity" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="value" className="block text-gray-700 font-bold mb-2">Value</label>
            <input type="number" id="value" className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="discount" className="block text-gray-700 font-bold mb-2">Discount</label>
            <input type="number" id="discount" className="w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="tax" className="block text-gray-700 font-bold mb-2">Tax</label>
            <input type="number" id="tax" className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="net-amount" className="block text-gray-700 font-bold mb-2">Net Amount</label>
          <input type="text" id="net-amount" className="w-full px-3 py-2 border rounded-md" readOnly />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Calculate</button>
      </div>

    </div>
  )
}

export default StampRequisition