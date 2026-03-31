"use client"

import * as React from "react"
import {
  Beaker,
  BookOpen,
  Bot,
  CreditCard,
  FileUp,
  HelpCircle,
  LayoutDashboard,
  Settings,
  Users,
  User,
  Building,
  School,
  FileText,
  ShieldCheck,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "College Hub",
      url: "/dashboard/college",
      icon: School,
      roles: ["admin"],
    },
    {
      title: "Department Hub",
      url: "/dashboard/departments",
      icon: Building,
      roles: ["admin"],
    },
    {
      title: "Student Directory",
      url: "/dashboard/students",
      icon: Users,
      roles: ["admin", "teacher"],
    },
    {
      title: "Faculty Directory",
      url: "/dashboard/faculty",
      icon: Users,
      roles: ["admin", "teacher"],
    },
    {
      title: "Exams Audit",
      url: "/dashboard/exams",
      icon: FileText,
      roles: ["admin", "teacher", "student"],
    },
    {
      title: "My Profile",
      url: "/dashboard/students",
      icon: User,
      roles: ["student"],
    },
    {
      title: "Academics",
      url: "/dashboard/academics",
      icon: BookOpen,
      roles: ["admin", "teacher", "student"],
    },
    {
      title: "Fee Management",
      url: "/dashboard/finance",
      icon: CreditCard,
      roles: ["admin"],
    },
    {
      title: "My Tuition",
      url: "/dashboard/finance",
      icon: CreditCard,
      roles: ["student"],
    },
    {
      title: "AI Suite",
      url: "/dashboard/ai",
      icon: Bot,
      roles: ["admin", "teacher", "student"],
    },
    {
      title: "Submissions",
      url: "/dashboard/assignments",
      icon: FileUp,
      roles: ["admin", "teacher", "student"],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      roles: ["admin"],
    },
    {
      title: "Help & Manual",
      url: "/dashboard/help",
      icon: HelpCircle,
      roles: ["admin", "teacher", "student"],
    },
  ],
}

import { getInstitutionSettings } from "@/app/actions/institution"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [settings, setSettings] = React.useState({ name: "CMS Portal", logo_url: null, is_demo_mode: true })
  const [userRole, setUserRole] = React.useState("student")

  React.useEffect(() => {
    async function load() {
      const dbSettings = await getInstitutionSettings()
      
      // Get brand overrides from cookies (Handover Synapse)
      const cookiesArr = document.cookie.split("; ")
      const instName = cookiesArr.find((row) => row.startsWith("instName="))?.split("=")[1]
      const instLogo = cookiesArr.find((row) => row.startsWith("instLogo="))?.split("=")[1]
      const userRoleRaw = cookiesArr.find((row) => row.startsWith("userRole="))?.split("=")[1]
      
      setSettings({
        name: instName ? decodeURIComponent(instName) : dbSettings.name,
        logo_url: instLogo ? decodeURIComponent(instLogo) : dbSettings.logo_url,
        is_demo_mode: dbSettings.is_demo_mode
      })

      if (userRoleRaw) setUserRole(userRoleRaw)
    }
    load()
  }, [])

  const filteredNav = data.navMain.filter(item => item.roles.includes(userRole))

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-sky-100 bg-white">
      <SidebarHeader className="border-b border-sky-50 pb-4">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-950 to-indigo-900 text-white shadow-xl shadow-sky-950/30 overflow-hidden ring-4 ring-sky-50 transition-all group-hover:scale-105">
            {settings.logo_url ? (
              <img src={settings.logo_url} alt="Logo" className="h-full w-full object-contain" />
            ) : (
              <BookOpen className="h-5 w-5 text-sky-400 group-hover:text-white transition-colors" />
            )}
          </div>
          <div className="flex flex-col gap-0.5 leading-none overflow-hidden transition-all duration-300">
            <div className="flex items-center gap-2">
              <span className="font-black text-sky-950 truncate max-w-[120px] italic">{settings.name}</span>
              {settings.is_demo_mode && (
                <span className="px-1.5 py-0.5 text-[9px] font-black bg-sky-950 text-sky-100 rounded-full">DEMO</span>
              )}
            </div>
            <span className="text-[10px] text-sky-400 font-black tracking-widest uppercase italic">
              {userRole === "admin" ? "Super Admin" : userRole === "teacher" ? "Principal Faculty" : "Scholar Node"}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3 pt-4">
        {settings.is_demo_mode && userRole === "admin" && (
          <SidebarGroup className="pb-4">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="bg-sky-50/50 hover:bg-sky-50 border border-sky-100/50 rounded-2xl group transition-all h-11">
                    <a href="/dashboard/help?section=demo">
                      <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white border border-sky-100 shadow-sm group-hover:scale-110 transition-transform">
                        <Beaker className="h-4 w-4 text-sky-600" />
                      </div>
                      <span className="text-sky-700 font-bold text-xs ml-2">Quick Demo sheet</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sky-300 uppercase text-[10px] font-black tracking-widest px-4 mb-2 italic">Institutional Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {filteredNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title}
                    className="rounded-2xl transition-all duration-200 hover:bg-sky-50 hover:text-sky-600 active:scale-95 group h-11"
                  >
                    <a href={item.url} className="flex items-center text-slate-500">
                      <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 text-slate-400 group-hover:text-sky-600" />
                      <span className="ml-3 text-sm font-medium tracking-tight">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
