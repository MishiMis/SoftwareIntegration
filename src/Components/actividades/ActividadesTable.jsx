  // ActividadesTable.jsx
  import { useState, useEffect } from "react";
  import { supabase } from "../../Js/database/supabaseClient";
  import AddActividades from "./AddActividades";
  import EditActividades from "./EditActividades";
  import { LuClipboardEdit } from "react-icons/lu";
  import { MdAutoDelete } from "react-icons/md";
import { GrWorkshop } from "react-icons/gr";
import {Tooltip} from 'react-tippy';

  const ActividadesTable = () => {
    const [actividades, setActividades] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editActivityId, setEditActivityId] = useState(null);

    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select(`
          idActividad,
          idUsuario,
          idTipo,
          idEstado,
          actividad,
          servicio,
          horasEstimadas,
          horasConsumidas,
          fechaLimite,
          users(name)
        `);
    
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
        <Tooltip
        title="Crear Actividad"
        >
          <button
            onClick={() => setShowAddModal(true)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {/* Add Activity */}
            <GrWorkshop/>
          </button>

        </Tooltip>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">User ID</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">State</th>
                <th scope="col" className="px-6 py-3">Activity</th>
                <th scope="col" className="px-6 py-3">Service</th>
                <th scope="col" className="px-6 py-3">Hours Estimated</th>
                <th scope="col" className="px-6 py-3">Hours Consumed</th>
                <th scope="col" className="px-6 py-3">Deadline</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
    {actividades.map((actividad) => (
      <tr key={actividad.idActividad} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td scope="row" className="px-6 py-4">{actividad.idActividad}</td>
        <td scope="row" className="px-6 py-4">{actividad.users?.name}</td>  {/* Mostrar el name del usuario */}
        <td scope="row" className="px-6 py-4">{actividad.idTipo}</td>
        <td scope="row" className="px-6 py-4">{actividad.idEstado}</td>
        <td scope="row" className="px-6 py-4">{actividad.actividad}</td>
        <td scope="row" className="px-6 py-4">{actividad.servicio}</td>
        <td scope="row" className="px-6 py-4">{actividad.horasEstimadas}</td>
        <td scope="row" className="px-6 py-4">{actividad.horasConsumidas}</td>
        <td scope="row" className="px-6 py-4">{actividad.fechaLimite}</td>
        <td scope="row" className="px-6 py-4">
          <button
            onClick={() => setEditActivityId(actividad.idActividad)}
            className="px-2 py-1 bg-yellow-500 text-white rounded-lg mr-2"
          >
            {/* Edit */}
            <LuClipboardEdit />
          </button>
          <button
            onClick={() => handleDelete(actividad.idActividad)}
            className="px-2 py-1 bg-red-500 text-white rounded-lg"
          >
            {/* Delete */}
            <MdAutoDelete />
          </button>
        </td>
      </tr>
    ))}
  </tbody>

          </table>
        </div>

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
