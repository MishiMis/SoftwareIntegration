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
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
              <tr className="[&>th]:px-6 [&>th]:py-3">
                <th scope="col" >ID</th>
                <th scope="col" >User ID</th>
                <th scope="col" >Type</th>
                <th scope="col" >State</th>
                <th scope="col" >Activity</th>
                <th scope="col" >Service</th>
                <th scope="col" >Hours Estimated</th>
                <th scope="col" >Hours Consumed</th>
                <th scope="col" >Deadline</th>
                <th scope="col" >Actions</th>
              </tr>
            </thead>
            <tbody>
    {actividades.map((actividad) => (
      <tr key={actividad.idActividad} className="bg-white border-b [&>td]:px-6 [&>td]:py-4 dark:bg-gray-800 dark:border-gray-700">
        <td scope="row" > {actividad.idActividad}</td>
        <td scope="row" > {actividad.users?.name}</td>  {/* Mostrar el name del usuario */}
        <td scope="row" > {actividad.idTipo}</td>
        <td scope="row" > {actividad.idEstado}</td>
        <td scope="row" > {actividad.actividad}</td>
        <td scope="row" > {actividad.servicio}</td>
        <td scope="row" > {actividad.horasEstimadas}</td>
        <td scope="row" > {actividad.horasConsumidas}</td>
        <td scope="row" > {actividad.fechaLimite}</td>
        <td scope="row" >
          <Tooltip title="Editar Actividad">
            <button
              onClick={() => setEditActivityId(actividad.idActividad)}
              className="px-2 py-1 bg-yellow-500 text-white rounded-lg mr-2"
            >
              {/* Edit */}
              <LuClipboardEdit />
            </button>
          </Tooltip>

          <Tooltip title="Borrar Actividad">
            <button
              onClick={() => handleDelete(actividad.idActividad)}
              className="px-2 py-1 bg-red-500 text-white rounded-lg"
            >
              {/* Delete */}
              <MdAutoDelete />
            </button>
          </Tooltip>
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
