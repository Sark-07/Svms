import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { fetchDataWithPatch } from "@/utils/fetcher";

const StampRequisionHistory = () => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleClick = async () => {
        if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
            toast.warn("Start date must be earlier than end date.");
        } else {
            const tableQueryParameters = {
                pageSize: 10,
                pageIndex: 0,
            };
            const { data, error } = await fetchDataWithPatch(`${import.meta.env.VITE_SERVER_URL}StampRequisition/GetAllStampRequisitionList?startDate=${startDate}&endDate=${endDate}`, setIsLoading, tableQueryParameters)
            if (error) {
                toast.error(error)
            } else {
                console.log(data);
                
            }
        }
    }
    return (
        <div className='w-full h-full md:px-8 py-4 flex flex-col gap-4'>
            <div>
                <h1 className='font-bold text-3xl'>Stamp Requisition History</h1>
            </div>
            <div className='mx-auto px-4 py-6 rounded border shadow-sm w-full flex flex-col gap-4'>
                <div className="flex gap-6 items-end mx-auto max-w-[32rem]">
                    <div className="flex-1 flex flex-col gap-2 items-start">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input type="date" onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className="flex-1 flex flex-col gap-2 items-start">
                        <Label htmlFor="startDate">End Date</Label>
                        <Input type="date" onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <Button onClick={handleClick}>Submit</Button>
                </div>
            </div>


        </div>
    )
}

export default StampRequisionHistory