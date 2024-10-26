import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { fetchDataWithPatch } from "@/utils/fetcher";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { RequisitionHistory } from "@/types/types";
import { getStatusColor } from "@/utils/getStatusColor";
import Modal from "@/components/ui/modal";
const StampRequisionHistory = () => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<RequisitionHistory[]>([])    //TODO: Put the type of requisition history

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
                setTableData(data.data)
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
                <div className='w-full border rounded '>
                    <Table>
                        <TableHeader className='bg-gray-100 h-12'>
                            <TableRow>
                                <TableHead className="w-[100px]">Serial No</TableHead>
                                <TableHead>Requisition No</TableHead>
                                <TableHead>Requisition Date</TableHead>
                                <TableHead>Gross Amount</TableHead>
                                <TableHead>Discount Amount</TableHead>
                                <TableHead>Tax Amount</TableHead>
                                <TableHead>Net Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                tableData.length > 0 ? (
                                    tableData.map((item, index: number) => {
                                        return (
                                            <TableRow className="h-12" key={item.id}>
                                                <TableCell className="font-medium">{index + 1}</TableCell>
                                                <TableCell>{item.requisitionNo}</TableCell>
                                                <TableCell>{item.requisitionDate}</TableCell>
                                                <TableCell>{item.grossAmount}</TableCell>
                                                <TableCell>{item.discountAmount}</TableCell>
                                                <TableCell>{item.taxAmount}</TableCell>
                                                <TableCell>{item.netAmount}</TableCell>
                                                <TableCell><span className={`${getStatusColor(item.statusCode)} py-1 px-2 rounded-sm`}>{item.status}</span></TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Modal tableData={item.childData} reqNo={item.requisitionNo}/>
                                                    {item.statusCode === 33 && <Button >Pay Now</Button>}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                ) : <TableRow className="h-12"><TableCell className='font-medium text-xl text-center'>No Items</TableCell></TableRow>
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default StampRequisionHistory