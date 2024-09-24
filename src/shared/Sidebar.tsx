
import { Settings } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link, useLocation } from 'react-router-dom'
import { MenuItems, sidebarItems } from '@/constants/sidebarItems'


const Sidebar = () => {
  const location = useLocation() as ReturnType<typeof useLocation>
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-20 flex-col border-r bg-background sm:flex">
      <div className='border-b py-4 w-full h-fit grid place-items-center'>
        <img src="/logo-sidebar.png" alt="footer-image" className='object-cover object-center w-16 h-8' />
      </div>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {
          sidebarItems.map((item: MenuItems) => {
            console.log(item.routeTo === location.pathname);
            
            return <TooltipProvider key={item.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={item.routeTo}
                          className={`${item.routeTo === location.pathname ? 'text-black' : 'text-muted-foreground'} flex h-9 w-9 items-center justify-center rounded-lg  transition-colors hover:text-foreground md:h-8 md:w-8`}
                        >
                          {item.icon} {/*React componet Icon*/}
                          <span className="sr-only">{item.title}</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">{item.tooltip}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
          })
        }

      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        < TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}

export default Sidebar