import EquipoLeft from "@/Components/equipo/EquipoLeft";
import UserTable from "@/Components/equipo/UserTable";

const EquipoTemplate = () => {
  return (
    <div className="grid grid-rows-3 gap-2 h-screen w-full font-roboto">
      <div className="row-span-2  bg-gradient-to-r from-gray-100 to-gray-300 flex items-center justify-center">
        <p><UserTable/></p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className=" bg-gradient-to-r from-gray-100 to-gray-300 flex items-center justify-center rounded-lg">
          <EquipoLeft/>
        </div>
        <div className=" bg-gradient-to-r from-gray-100 to-gray-300 flex items-center justify-center rounded-lg">
        </div>
      </div>
    </div>
  );
};

export default EquipoTemplate;
