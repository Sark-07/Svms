import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { RequisitionHistoryChildData } from "@/types/types";
import { Eye } from "lucide-react";

const Modal = ({ tableData, reqNo }: { tableData: RequisitionHistoryChildData[]; reqNo: string }) => {
    return (
        <Dialog>
            <DialogTrigger><Eye /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-2">Req No: <span className="text-base">{reqNo}</span></DialogTitle>
                    <DialogDescription>
                        <div className='w-full border rounded '>
                            <Table>
                                <TableHeader className='bg-gray-100 h-12'>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Serial No</TableHead>
                                        <TableHead>Stamp Category</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead>Denomination</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Gross Amount</TableHead>
                                        <TableHead>Discount Amount</TableHead>
                                        <TableHead>Tax Amount</TableHead>
                                        <TableHead>Net Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        tableData.length > 0 ? (
                                            tableData.map((item, index: number) => {
                                                return (
                                                    <TableRow className="h-12" key={item.id}>
                                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                                        <TableCell>{item.stampCategory}</TableCell>
                                                        <TableCell>{item.description}</TableCell>
                                                        <TableCell>{item.denomination}</TableCell>
                                                        <TableCell>{item.quantity}</TableCell>
                                                        <TableCell>{item.grossAmount}</TableCell>
                                                        <TableCell>{item.discountAmount}</TableCell>
                                                        <TableCell>{item.taxAmount}</TableCell>
                                                        <TableCell>{item.netAmount}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        ) : <TableRow className="h-12"><TableCell className='font-medium text-xl text-center'>No Items</TableCell></TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default Modal