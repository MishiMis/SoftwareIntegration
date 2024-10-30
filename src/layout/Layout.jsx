
import { Sidebar } from "@/Components/sidebar/Sidebar"


// eslint-disable-next-line react/prop-types
export const Layout = ( {children} ) => {
    
  return (
    <main className="flex">
    <Sidebar/>

    {children }
    </main>
  )
}
