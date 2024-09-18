import { CirclePlus, IndianRupee, LayoutDashboard, UserRound } from "lucide-react"

interface MenuItems {
    icon: React.ReactElement
    title: string
    tooltip: string
    routeTo: string
}
export const sidebarItems: MenuItems[] = [
    {
        icon: <LayoutDashboard/>,
        title: 'Dashboard',
        tooltip: 'Dashboard',
        routeTo: '/Dashboard'
    },
    {
        icon: <CirclePlus/>,
        title: 'Stamp Requisition',
        tooltip: 'Stamp Requisition',
        routeTo: '/new-stamp-requisition'
    },
    {
        icon: <IndianRupee/>,
        title: 'Payments',
        tooltip: 'Payments',
        routeTo: '/payments'
    },
    {
        icon: <UserRound/>,
        title: 'Profile',
        tooltip: 'Profile',
        routeTo: '/profile'
    },
]