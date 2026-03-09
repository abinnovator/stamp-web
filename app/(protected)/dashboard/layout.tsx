import { AppSidebar } from '@/components/app-sidebar'
import { ChatSidebar } from '@/components/chat-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
      <ChatSidebar />
    </SidebarProvider>
  )
}

export default layout