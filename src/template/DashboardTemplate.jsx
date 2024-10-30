import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Bell } from "lucide-react"


export const DashboardTemplate = () => {
  return (
    <>
        <div className="w-full min-h-screen bg-gray-600 text-white p-4 sm:p-6 md:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
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
              className="bg-gray-800 rounded-full pl-10 pr-4 w-full sm:w-64"
            />
          </div>
          <Bell className="text-gray-400 cursor-pointer" />
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>MO</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          { title: "ACTIVIDADES POR REALIZAR", value: "6", color: "bg-blue-600" },
          { title: "ACTIVIDADES POR FINALIZAR", value: "4", color: "bg-yellow-500" },
          { title: "BUGS", value: "2", color: "bg-red-500" },
          { title: "ACTIVIDADES COMPLETADAS ", value: "10", color: "bg-green-500" },
        ].map((stat, index) => (
          <Card key={index} className={`${stat.color} text-white`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">Desarrolladores</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center sm:justify-start gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <Avatar key={index} className="w-16 h-16">
                <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={`Doctor ${index + 1}`} />
                <AvatarFallback>DEV</AvatarFallback>
              </Avatar>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">18/10/2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#4CAF50"
                    strokeWidth="2"
                    strokeDasharray="90, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">90%</span>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-lg font-semibold">avance</p>
              <p className="text-sm text-gray-400">Actividad del dia</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}
