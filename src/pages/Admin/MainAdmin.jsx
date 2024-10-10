import SidebarAdmin from "../../Components/MainComponents/admin/SidebarAdmin";

const MainAdmin = () => {
  return (
    <div className="flex h-screen font-roboto">
      <aside className="w-64 bg-[#FCFCFE] text-white p-2">
        <SidebarAdmin/>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-[#FFFFFF] text-white p-4">
          <h1 className="text-2xl">Dashboard Header</h1>
        </header>
        <main className="flex-1 p-6 bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">Content Area</h2>
          <p>This is where the main content will go.</p>
        </main>
      </div>
    </div>
  );
};

export default MainAdmin;
