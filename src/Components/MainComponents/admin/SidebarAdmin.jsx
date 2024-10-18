import { IoMdMenu } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { TbReport } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

import img from "../../../img/softwareIntegration.png";

const SidebarAdmin = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center justify-between text-black mb-[2rem]">
          <div className="w-4/5">
            <img src={img} alt="" />
          </div>
          <div className="w-1/5 flex justify-center text-[2rem] text-[#6A6D72] hover:text-[#41A8F4]">
            <IoMdMenu />
          </div>
        </div>
        <div className="text-black ml-[1rem] mb-[1rem] font-bold">
          <label>HOME</label>
        </div>
        <div className="flex items-center gap-2 mb-2 text-[#878991] px-[1rem] py-[0.5rem] hover:bg-[#f0f7ff] hover:text-[#41A8F4] rounded-lg">
          <MdDashboard />
          <label>Dashboard</label>
        </div>
        <div className="flex items-center gap-2 mb-2 text-[#878991] px-[1rem] py-[0.5rem] hover:bg-[#f0f7ff] hover:text-[#41A8F4] rounded-lg">
          <FaTasks />
          <label>Actividades</label>
        </div>
        <div className="flex items-center gap-2 mb-2 text-[#878991] px-[1rem] py-[0.5rem] hover:bg-[#f0f7ff] hover:text-[#41A8F4] rounded-lg">
          <RiTeamFill />
          <label>Equipo</label>
        </div>
        <div className="flex items-center gap-2 mb-2 text-[#878991] px-[1rem] py-[0.5rem] hover:bg-[#f0f7ff] hover:text-[#41A8F4] rounded-lg">
          <TbReport />
          <label>Reportes</label>
        </div>
        <div className="flex items-center gap-2 mb-2 text-[#878991] px-[1rem] py-[0.5rem] hover:bg-[#f0f7ff] hover:text-[#41A8F4] rounded-lg">
          <IoIosSettings />
          <label>Configuraciones</label>
        </div>

        <div className="flex items-center justify-between mt-auto bg-[#f0f7ff] px-4 py-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <IoIosPerson className="text-[#41A8F4] text-[2rem]" />
            <div>
              <label className="text-[#333] font-semibold">Usuario</label>
              <p className="text-[#878991] text-sm">Admin</p>
            </div>
          </div>
          <div className=" text-[#878991] hover:text-[#41a8f4] text-[1rem]">
            <CiLogout />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;
