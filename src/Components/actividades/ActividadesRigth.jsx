import { useState, useEffect } from "react";
import { supabase } from "../../Js/database/supabaseClient";

const ActividadesRigth = () => {
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Definir cuántos items se mostrarán por página

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

  // Obtener las actividades de la página actual
  const indexOfLastActivity = currentPage * itemsPerPage;
  const indexOfFirstActivity = indexOfLastActivity - itemsPerPage;
  const currentActivities = activities.slice(indexOfFirstActivity, indexOfLastActivity);

  // Cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Calcular el número total de páginas
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Tabla de actividades */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Actividad</th>
            <th scope="col" className="px-6 py-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          {currentActivities.map((activity, index) => (
            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">{activity.actividad}</td>
              <td className="px-6 py-4">
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

      {/* Paginación */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-l"
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
        >
          Anterior
        </button>
        <span className="px-4 py-2">
          {currentPage} de {totalPages}
        </span>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-r"
          onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : currentPage)}
        >
          Siguiente
        </button>
      </div>

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
