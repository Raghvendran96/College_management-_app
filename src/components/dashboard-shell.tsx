"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { UserNav } from "./dashboard/user-nav"
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { HelpCircle } from "lucide-react"

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
        <main className="w-full flex-1 flex flex-col min-h-screen relative">
          <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-sky-100 bg-white/80 px-8 backdrop-blur-xl transition-[height] duration-200">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-sky-500 hover:bg-sky-50 rounded-xl p-2 transition-all active:scale-90" />
              <div className="h-4 w-[1px] bg-sky-100 mx-2 hidden sm:block"></div>
              <h1 className="font-bold text-xl tracking-tight text-sky-950 px-2 flex items-center gap-2">
                <span className="hidden lg:inline uppercase italic tracking-tighter text-[11px] tracking-widest text-sky-400">Institutional Hub</span>
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

          {/* GLOBAL FLOATING HELP SYNAPSE (V11) */}
          <div className="fixed bottom-10 right-10 z-[100] group">
            <Tooltip>
               <TooltipTrigger asChild>
                  <a 
                    href="/KBITM_CMS_OFFICIAL_GUIDE.html" 
                    target="_blank" 
                    className="flex items-center justify-center w-20 h-20 rounded-[2rem] bg-sky-950/90 backdrop-blur-3xl border border-sky-400/20 text-white shadow-3xl hover:bg-sky-500 hover:scale-110 transition-all duration-500 active:scale-95 animate-in fade-in zoom-in slide-in-from-bottom-10"
                  >
                     <HelpCircle className="h-8 w-8 text-sky-400 group-hover:text-white transition-colors" />
                     <div className="absolute -top-1 -right-1 w-7 h-7 bg-rose-600 rounded-full border-4 border-white flex items-center justify-center text-[9px] font-black italic shadow-lg">V11</div>
                  </a>
               </TooltipTrigger>
               <TooltipContent side="left" className="bg-sky-950 text-white font-black italic border-0 px-6 py-3 rounded-2xl shadow-3xl mb-4">
                  Official Institutional Guide (V11)
               </TooltipContent>
            </Tooltip>
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  )
}
