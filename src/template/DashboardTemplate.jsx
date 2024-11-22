import { ActivitiesCalendar } from "@/Components/dashboard/ActivitiesCalendar";
import DashboardAlert from "@/Components/dashboard/DashboardAlert";
import { DashboardCards } from "@/Components/dashboard/DashboardCards";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Bell } from "lucide-react";

export const DashboardTemplate = () => {
  return (
    <>
      <div className="w-full min-h-screen bg-[#ffffff] text-black p-4 sm:p-6 md:p-8">
        <header className="flex flex-col border-b border-gray-200 pb-5 sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold">Bienvenido👋</h1>
            <p className="text-gray-400">Admin</p>
          </div>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search"
                className="bg-white rounded-full pl-10 pr-4 w-full sm:w-64"
              />
            </div>
            <Bell className="text-gray-400 cursor-pointer" />
            <Avatar>
              <AvatarImage src="../assets/userSin.png" alt="User" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Nueva sección debajo del header */}
        <div className="grid grid-rows-[1fr_2fr] gap-4 h-[calc(100%-112px)]">
          {/* Parte superior pequeña */}
          <div className="bg-gray-100 rounded-lg p-4">
            <DashboardCards/>
          </div>
          {/* Parte inferior dividida en dos columnas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 rounded-lg p-4 ">
              <ActivitiesCalendar/>
            </div>
            <div className="bg-gray-200 rounded-lg p-4">
              <DashboardAlert/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
