import { useState, useEffect } from "react";
import { supabase } from "../../Js/database/supabaseClient";

const ActividadesRigth = () => {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar las actividades desde Supabase
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from("activities")
          .select("actividad");

        if (error) throw error;
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  // Abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Actividades</h2>
      {/* Tabla de actividades */}
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Actividad</th>
            <th className="border border-gray-300 p-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{activity.actividad}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={openModal}
                >
                  Ver Reportes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h3 className="text-lg font-semibold">Reportes</h3>
            <p>No hay reportes pendientes.</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActividadesRigth;
