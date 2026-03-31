"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { UserNav } from "./dashboard/user-nav"
import { TooltipProvider } from "./ui/tooltip"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname.startsWith("/dashboard")

  if (!isDashboard) {
    return <div className="min-h-screen bg-white">{children}</div>
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-sky-100 bg-white/80 px-8 backdrop-blur-xl transition-[height] duration-200">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-sky-500 hover:bg-sky-50 rounded-xl p-2 transition-all active:scale-90" />
              <div className="h-4 w-[1px] bg-sky-100 mx-2 hidden sm:block"></div>
              <h1 className="font-bold text-xl tracking-tight text-sky-950 px-2 flex items-center gap-2">
                <span className="hidden lg:inline uppercase italic tracking-tighter">Academic Portal</span>
                <span className="lg:hidden">CMS</span>
              </h1>
            </div>
            <UserNav />
          </header>
          <div className="flex-1 p-6 md:p-8 lg:p-10 bg-slate-50/30 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  )
}
