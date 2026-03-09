"use client"

import * as React from "react"
import { WebSearchWindow } from "@/components/web-search-window"
import { UserButton } from "@clerk/nextjs"
import { Globe, HomeIcon, Mail } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navMain = [
  {
    title: "Search",
    icon: <Globe />,
  },
  {
    title: "Mail",
    icon: <Mail />
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [searchOpen, setSearchOpen] = React.useState(false)

  return (
    <>
      {searchOpen && <WebSearchWindow onClose={() => setSearchOpen(false)} />}
      {/* Outer sidebar — shell controlled by SidebarProvider */}
      <Sidebar
        collapsible="icon"
        className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
        {...props}
      >
        {/* Inner icon rail — always visible, never collapses */}
        <Sidebar collapsible="none" className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                  <a href="/dashboard">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <HomeIcon className="size-4" />
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent className="px-1.5 md:px-0">
                <SidebarMenu>
                  {navMain.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{ children: item.title, hidden: false }}
                        onClick={() => {
                          if (item.title === "Search") setSearchOpen((v) => !v)
                        }}
                        isActive={item.title === "Search" && searchOpen}
                        className="px-2.5 md:px-2"
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <UserButton />
          </SidebarFooter>
        </Sidebar>
      </Sidebar>
    </>
  )
}


