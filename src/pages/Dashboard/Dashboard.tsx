import { PieChartComponent } from '@/components/ui/charts/PieChartComponent'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import HorizontalBarChart from '@/components/ui/charts/HorizontalBarChart'
import { useNavigate} from 'react-router-dom'


const Dashboard = () => {
    const navigate: ReturnType<typeof useNavigate> = useNavigate()
    return (
        <div className=' w-full px-8 py-4 flex gap-3'>
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 w-[75%]">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
                    <Card
                        className="sm:col-span-1 md:col-span-2" x-chunk="dashboard-05-chunk-0"
                    >
                        <CardHeader className="pb-3">
                            <CardTitle>Your Orders</CardTitle>
                            <CardDescription className="max-w-lg sm:text-balance md:text-nowrap leading-relaxed">
                                Introducing Our Dynamic Orders Dashboard for Seamless
                                Management and Insightful Analysis.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button onClick={() => navigate('/dashboard/new-stamp-requisition') }>Create New Requisition</Button>
                        </CardFooter>
                    </Card>
                    <Card x-chunk="dashboard-05-chunk-1">
                        <CardHeader className="pb-2">
                            <CardDescription>This Week</CardDescription>
                            <CardTitle className="text-4xl">₹1,329</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +25% from last week
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={25} aria-label="25% increase" />
                        </CardFooter>
                    </Card>
                    <Card x-chunk="dashboard-05-chunk-2">
                        <CardHeader className="pb-2">
                            <CardDescription>This Month</CardDescription>
                            <CardTitle className="text-4xl">₹5,329</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +10% from last month
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={12} aria-label="12% increase" />
                        </CardFooter>
                    </Card>
                </div>
                <Tabs defaultValue="week">
                    <div className="flex items-center">
                        <h1 className='text-2xl font-bold'>Recent Requisitions</h1>
                        {/* <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">Filter</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>
                                        Fulfilled
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Declined
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Refunded
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-7 gap-1 text-sm"
                            >
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only">Export</span>
                            </Button>
                        </div> */}
                    </div>
                    <TabsContent value="week">
                        <Card x-chunk="dashboard-05-chunk-3">
                            <CardHeader className="px-7">
                                <CardTitle>Requisitions</CardTitle>
                                <CardDescription>
                                    Recent requisitions made by you.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Customer</TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Type
                                            </TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Status
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Date
                                            </TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="bg-accent">
                                            <TableCell>
                                                <div className="font-medium">Liam Johnson</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    liam@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Sale
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    Fulfilled
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                2023-06-23
                                            </TableCell>
                                            <TableCell className="text-right">₹250.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Olivia Smith</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    olivia@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Refund
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="outline">
                                                    Declined
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                2023-06-24
                                            </TableCell>
                                            <TableCell className="text-right">₹150.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Noah Williams</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    noah@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Subscription
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    Fulfilled
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                2023-06-25
                                            </TableCell>
                                            <TableCell className="text-right">₹350.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Emma Brown</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    emma@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Sale
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    Fulfilled
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                2023-06-26
                                            </TableCell>
                                            <TableCell className="text-right">₹450.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Liam Johnson</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    liam@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Sale
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    Fulfilled
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                2023-06-23
                                            </TableCell>
                                            <TableCell className="text-right">₹250.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Liam Johnson</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    liam@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Sale
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    Fulfilled
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                2023-06-23
                                            </TableCell>
                                            <TableCell className="text-right">₹250.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Olivia Smith</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    olivia@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Refund
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="outline">
                                                    Declined
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                2023-06-24
                                            </TableCell>
                                            <TableCell className="text-right">₹150.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Emma Brown</div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    emma@example.com
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                Sale
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    Fulfilled
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                2023-06-26
                                            </TableCell>
                                            <TableCell className="text-right">₹450.00</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="chart-wrapper ml-auto flex w-[25%] md:flex-col items-start gap-4 sm:flex-row md:pl-4">
                <PieChartComponent />
                <HorizontalBarChart/>
            </div>
        </div>
    )
}

export default Dashboard