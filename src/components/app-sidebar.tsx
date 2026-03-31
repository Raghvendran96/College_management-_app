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
  User,
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
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Student Info",
      url: "#student",
      icon: User,
    },
    {
      title: "Academics",
      url: "#academics",
      icon: BookOpen,
    },
    {
      title: "Finance",
      url: "/dashboard/finance",
      icon: CreditCard,
    },
    {
      title: "AI Tutor",
      url: "#ai",
      icon: Bot,
    },
    {
      title: "Assignments",
      url: "/dashboard/assignments",
      icon: FileUp,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Help & Support",
      url: "/dashboard/help",
      icon: HelpCircle,
    },
  ],
}

import { getInstitutionSettings } from "@/app/actions/institution"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [settings, setSettings] = React.useState({ name: "CMS Portal", logo_url: null, is_demo_mode: true })

  React.useEffect(() => {
    async function load() {
      const data = await getInstitutionSettings()
      setSettings(data)
    }
    load()
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground overflow-hidden">
            {settings.logo_url ? (
              <img src={settings.logo_url} alt="Logo" className="h-full w-full object-contain" />
            ) : (
              <BookOpen className="h-4 w-4" />
            )}
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{settings.name}</span>
              {settings.is_demo_mode && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 rounded border border-amber-200">DEMO</span>
              )}
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">v1.0.0 (Production)</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {settings.is_demo_mode && (
          <SidebarGroup className="pb-0">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="bg-amber-50 hover:bg-amber-100 border border-amber-100">
                    <a href="/dashboard/help?section=demo">
                      <Beaker className="h-4 w-4 text-amber-700" />
                      <span className="text-amber-700 font-medium">Quick Demo Sheet</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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
