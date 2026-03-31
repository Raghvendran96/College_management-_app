"use client"

import { useRouter } from "next/navigation"
import { LogOut, User, Settings, Bell } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export function UserNav() {
  const router = useRouter()

  const handleLogout = () => {
    // Clear the simulation cookie
    document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/login")
  }

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" className="text-sky-500 hover:bg-sky-50 rounded-full">
        <Bell className="h-5 w-5" />
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border-2 border-sky-100 hover:border-sky-300 transition-all">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Admin" />
              <AvatarFallback className="bg-sky-500 text-white font-bold">AD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2 border-sky-100 shadow-xl" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-bold leading-none text-sky-950">Administrator</p>
              <p className="text-xs leading-none text-sky-500">admin@college.edu</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-sky-50" />
          <DropdownMenuGroup>
            <DropdownMenuItem className="focus:bg-sky-50 focus:text-sky-600 cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-sky-50 focus:text-sky-600 cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-sky-50" />
          <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer font-semibold">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
