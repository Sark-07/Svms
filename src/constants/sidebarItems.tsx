import { CirclePlus, IndianRupee, LayoutDashboard, LucideHistory, UserRound } from "lucide-react"

export interface MenuItems {
    id: number
    icon: React.ReactElement
    title: string
    tooltip: string
    routeTo: string
}
export const sidebarItems: MenuItems[] = [
    {
        id: 0,
        icon: <LayoutDashboard />,
        title: 'Dashboard',
        tooltip: 'Dashboard',
        routeTo: '/dashboard'
    },
    {
        id: 1,
        icon: <CirclePlus />,
        title: 'Stamp Requisition',
        tooltip: 'Stamp Requisition',
        routeTo: '/dashboard/new-stamp-requisition'
    },
    {
        id: 2,
        icon: <LucideHistory />,
        title: 'Requisition History',
        tooltip: 'Requisition History',
        routeTo: '/dashboard/stamp-requisition-history'
    },
    {
        id: 3,
        icon: <IndianRupee />,
        title: 'Payments',
        tooltip: 'Payments',
        routeTo: '/dashboard/payments'
    },
    {
        id: 4,
        icon: <UserRound />,
        title: 'Profile',
        tooltip: 'Profile',
        routeTo: '/dashboard/profile'
    },
]