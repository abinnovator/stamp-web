import { AppSidebar } from "@/components/app-sidebar"
import Btn09 from "@/components/mvpblocks/btn-gradient1"
import { NavActions } from "@/components/nav-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <div className="px-8 py-8">
      <div className="flex flex-row justify-between items-center"><h1 className="text-3xl">Your Stamps</h1>
      <Btn09 text="Create Stamp" link="/dashboard/stamp" /></div>
      

    </div>
  )
}
