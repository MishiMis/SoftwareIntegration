import { Sidebar } from "@/Components/sidebar/Sidebar";
import HeaderAdmin from "../../Components/MainComponents/admin/HeaderAdmin";
import { Dasboard } from "@/Components/dashboard/Dasboard";

// import SidebarAdmin from "../../Components/MainComponents/admin/SidebarAdmin";
// import Dasborad from "../../Components/templates/Dasborad";

const MainAdmin = () => {
  return (
    <div className="flex h-screen font-roboto">
      {/* <aside className="w-64 bg-[#FCFCFE] text-white "> */}
        {/* <SidebarAdmin/> */}
      {/* </aside> */}
        < Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="bg-[#FFFFFF] text-white">
          <HeaderAdmin/>
        </header>
        <main >
          <Dasboard/>
        {/* className="flex-1 p-6 bg-gray-100" */}
          {/* <h2 className="text-xl font-semibold mb-4">Lorem, ipsum.</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, pariatur?</p> */}

          {/* <  />+ */}

        </main>
      </div>
    </div>
  );
};

export default MainAdmin;
