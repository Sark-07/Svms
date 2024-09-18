import { CirclePlus, IndianRupee, LayoutDashboard, UserRound } from "lucide-react"

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
        icon: <LayoutDashboard/>,
        title: 'Dashboard',
        tooltip: 'Dashboard',
        routeTo: '/dashboard'
    },
    {
        id: 1,
        icon: <CirclePlus/>,
        title: 'Stamp Requisition',
        tooltip: 'Stamp Requisition',
        routeTo: '/new-stamp-requisition'
    },
    {
        id: 2,
        icon: <IndianRupee/>,
        title: 'Payments',
        tooltip: 'Payments',
        routeTo: '/payments'
    },
    {
        id: 3,
        icon: <UserRound/>,
        title: 'Profile',
        tooltip: 'Profile',
        routeTo: '/profile'
    },
]