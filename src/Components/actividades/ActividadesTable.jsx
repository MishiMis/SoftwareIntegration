import { useState, useEffect } from "react";
import { supabase } from "../../Js/database/supabaseClient";
import AddActividades from "./AddActividades";
import EditActividades from "./EditActividades";
import ModalActivities from "./ModalActivities.jsx"; // Importamos el nuevo modal
import { LuClipboardEdit } from "react-icons/lu";
import { MdAutoDelete } from "react-icons/md";
import { GrWorkshop, GrNext, GrPrevious } from "react-icons/gr";
import { Tooltip } from "react-tippy";

const ActividadesTable = () => {
  const [actividades, setActividades] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false); // Estado para el modal de proyectos
  const [editActivityId, setEditActivityId] = useState(null);
  const [selectedProyecto, setSelectedProyecto] = useState(null);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("proyectos").select("idProyecto, nombre");
    if (error) {
      console.error("Error fetching projects:", error.message);
    } else {
      setProyectos(data);
    }
  };

  const fetchActivities = async (filterProyectoId = null) => {
    let query = supabase
      .from("activities")
      .select(`
        idActividad,
        idUsuario,
        idProyecto,
        idTipo,
        idEstado,
        actividad,
        servicio,
        horasEstimadas,
        horasConsumidas,
        fechaLimite,
        users(name),
        estado(nombre),
        tipoActividad(nombre)
      `);

    if (filterProyectoId) {
      query = query.eq("idProyecto", filterProyectoId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching activities:", error.message);
    } else {
      setActividades(data);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchActivities();
  }, []);

  const handleSearch = () => {
    if (selectedProyecto) {
      fetchActivities(selectedProyecto);
    }
  };

  const handleDelete = async (actividadId) => {
    try {
      const { error } = await supabase
        .from("activities")
        .delete()
        .eq("idActividad", actividadId);

      if (error) {
        console.error("Error al borrar la actividad:", error.message);
      } else {
        fetchActivities(selectedProyecto);
        alert("Actividad eliminada con éxito");
      }
    } catch (error) {
      console.error("Error al borrar la actividad:", error.message);
    }
  };

  const totalPages = Math.ceil(actividades.length / itemsPerPage);

  const currentItems = actividades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <Tooltip title="Crear Actividad">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-4"
          >
            <GrWorkshop />
          </button>
        </Tooltip>

        {/* Lista de Proyectos */}
        <select
          value={selectedProyecto || ""}
          onChange={(e) => setSelectedProyecto(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="">Seleccione un Proyecto</option>
          {proyectos.map((proyecto) => (
            <option key={proyecto.idProyecto} value={proyecto.idProyecto}>
              {proyecto.nombre}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Buscar
        </button>

        {/* Botón Agregar Proyecto */}
        <button
          onClick={() => setShowProjectModal(true)}
          className="ml-4 px-4 py-2 bg-purple-500 text-white rounded-lg"
        >
          Agregar Proyecto
        </button>
      </div>

      {/* Tabla de Actividades */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="[&>th]:px-6 [&>th]:py-3">
              <th scope="col">ID</th>
              <th scope="col">User ID</th>
              <th scope="col">Type</th>
              <th scope="col">State</th>
              <th scope="col">Activity</th>
              <th scope="col">Service</th>
              <th scope="col">Hours Estimated</th>
              <th scope="col">Hours Consumed</th>
              <th scope="col">Deadline</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((actividad) => (
              <tr
                key={actividad.idActividad}
                className="bg-white border-b [&>td]:px-6 [&>td]:py-4 dark:bg-gray-800 dark:border-gray-700"
              >
                <td>{actividad.idActividad}</td>
                <td>{actividad.users?.name}</td>
                <td>{actividad.tipoActividad?.nombre}</td>
                <td>{actividad.estado?.nombre}</td>
                <td>{actividad.actividad}</td>
                <td>{actividad.servicio}</td>
                <td>{actividad.horasEstimadas}</td>
                <td>{actividad.horasConsumidas}</td>
                <td>{actividad.fechaLimite}</td>
                <td className="flex justify-end">
                  <Tooltip title="Editar Actividad">
                    <button
                      onClick={() => setEditActivityId(actividad.idActividad)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded-lg mr-2"
                    >
                      <LuClipboardEdit />
                    </button>
                  </Tooltip>
                  <Tooltip title="Borrar Actividad">
                    <button
                      onClick={() => handleDelete(actividad.idActividad)}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg"
                    >
                      <MdAutoDelete />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <Tooltip title="Ir a la página anterior">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 ${
              currentPage === 1 ? "bg-gray-300" : "bg-blue-500"
            } text-white rounded-lg`}
          >
            <GrPrevious />
          </button>
        </Tooltip>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <Tooltip title="Ir a la página siguiente">
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 ${
              currentPage === totalPages ? "bg-gray-300" : "bg-blue-500"
            } text-white rounded-lg`}
          >
            <GrNext />
          </button>
        </Tooltip>
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

      {showProjectModal && (
        <ModalActivities
          closeModal={() => setShowProjectModal(false)}
          fetchProjects={fetchProjects}
        />
      )}
    </div>
  );
};

export default ActividadesTable;
