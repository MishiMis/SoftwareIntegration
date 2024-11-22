import { useState, useEffect } from "react";
import { supabase } from "../../Js/database/supabaseClient"; // Asegúrate de que esta ruta sea correcta

const DashboardAlert = () => {
  const [activities, setActivities] = useState([]);

  // Cargar las actividades y la fecha límite desde Supabase
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from("activities")
          .select("actividad, fechaLimite");

        if (error) throw error;
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  // Función para enviar la alerta
  const sendAlert = (actividad) => {
    alert(`Alerta enviada para la actividad: ${actividad}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Actividades</h2>
      {/* Tabla de actividades */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Actividad</th>
              <th scope="col" className="px-6 py-3">Fecha Limite</th>
              <th scope="col" className="px-6 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">{activity.actividad}</td>
                <td className="px-6 py-4">{activity.fechaLimite}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => sendAlert(activity.actividad)}
                  >
                    Enviar Alerta
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardAlert;
