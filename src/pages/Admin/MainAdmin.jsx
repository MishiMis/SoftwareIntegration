import HeaderAdmin from "../../Components/MainComponents/admin/HeaderAdmin";
import SidebarAdmin from "../../Components/MainComponents/admin/SidebarAdmin";

const MainAdmin = () => {
  return (
    <div className="flex h-screen font-roboto">
      <aside className="w-64 bg-[#FCFCFE] text-white p-2">
        <SidebarAdmin/>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-[#FFFFFF] text-white p-4">
          <HeaderAdmin/>
        </header>
        <main className="flex-1 p-6 bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">Lorem, ipsum.</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, pariatur?</p>
        </main>
      </div>
    </div>
  );
};

export default MainAdmin;
