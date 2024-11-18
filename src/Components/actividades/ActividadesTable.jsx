// ActividadesTable.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../Js/database/supabaseClient";
import AddActividades from "./AddActividades";
import EditActividades from "./EditActividades";

const ActividadesTable = () => {
  const [actividades, setActividades] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editActivityId, setEditActivityId] = useState(null);

  const fetchActivities = async () => {
    const { data, error } = await supabase.from("activities").select("*");
    if (error) {
      console.error("Error fetching activities:", error.message);
    } else {
      setActividades(data);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = async (idActividad) => {
    const { error } = await supabase
      .from("activities")
      .delete()
      .eq("idActividad", idActividad);
    if (error) {
      console.error("Error deleting activity:", error.message);
    } else {
      fetchActivities();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Actividades</h1>
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Add Activity
      </button>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">User ID</th>
            <th className="px-4 py-2 border">Type</th>
            <th className="px-4 py-2 border">State</th>
            <th className="px-4 py-2 border">Activity</th>
            <th className="px-4 py-2 border">Service</th>
            <th className="px-4 py-2 border">Hours Estimated</th>
            <th className="px-4 py-2 border">Hours Consumed</th>
            <th className="px-4 py-2 border">Deadline</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {actividades.map((actividad) => (
            <tr key={actividad.idActividad}>
              <td className="px-4 py-2 border">{actividad.idActividad}</td>
              <td className="px-4 py-2 border">{actividad.idUsuario}</td>
              <td className="px-4 py-2 border">{actividad.idTipo}</td>
              <td className="px-4 py-2 border">{actividad.idEstado}</td>
              <td className="px-4 py-2 border">{actividad.actividad}</td>
              <td className="px-4 py-2 border">{actividad.servicio}</td>
              <td className="px-4 py-2 border">{actividad.horasEstimadas}</td>
              <td className="px-4 py-2 border">{actividad.horasConsumidas}</td>
              <td className="px-4 py-2 border">{actividad.fechaLimite}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => setEditActivityId(actividad.idActividad)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-lg mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(actividad.idActividad)}
                  className="px-2 py-1 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <AddActividades
          closeModal={() => setShowAddModal(false)}
          fetchActivities={fetchActivities}
        />
      )}

      {editActivityId && (
        <EditActividades
          activityId={editActivityId}
          closeModal={() => setEditActivityId(null)}
          fetchActivities={fetchActivities}
        />
      )}
    </div>
  );
};

export default ActividadesTable;
