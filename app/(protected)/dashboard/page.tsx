import { AppSidebar } from "@/components/app-sidebar"
import Btn09 from "@/components/mvpblocks/btn-gradient1"
import { NavActions } from "@/components/nav-actions"
import StampCard from "@/components/StampCard"
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
import Link from "next/link"

export default function Page() {
  return (
    <div className=" py-8 bg-[#191919] h-screen">
      <h1 className="text-center text-3xl pt-16 font-bold">Good evening</h1>
      {/* Recent Stamps */}
      <div className="flex flex-col gap-5 px-72 pt-3">
        <div className="flex flex-row justify-between">
          <h1 className="text-[#ADA9A3]">Recently visited</h1>
          <Link href={'/dashboard/stamp'}><p>+</p></Link>
          
        </div>
        
        <div className="flex flex-row gap-4">
          <StampCard name="Science" date="Oct 26,2025" />
          <StampCard name="Science" date="Oct 26,2025" />
          <StampCard name="Science" date="Oct 26,2025" />

        </div>

      </div>
      {/* Timetable */}
      <div className="flex flex-col gap-5 px-72 pt-3">
        <div className="flex flex-row justify-between">
          <h1 className="text-[#ADA9A3]">Timetable</h1>
          <Link href={'/dashboard/stamp'}><p>+</p></Link>
          
        </div>
        
        <div className="flex flex-row gap-4">

        </div>

      </div>
      

    </div>
  )
}
