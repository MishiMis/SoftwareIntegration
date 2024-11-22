import { useState } from "react";
import { supabase } from "../../Js/database/supabaseClient";

const ModalActivities = ({ closeModal, fetchProjects }) => {
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddProject = async () => {
    if (!projectName.trim() || !startDate || !endDate) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Inserta el proyecto en la base de datos
    const { error } = await supabase.from("proyectos").insert([
      {
        nombre: projectName,
        fechaInicio: startDate,
        fechaFin: endDate,
        idEstado: 1, // Valor genérico para idEstado
      },
    ]);

    if (error) {
      console.error("Error al agregar el proyecto:", error.message);
      alert("Ocurrió un error al guardar el proyecto.");
    } else {
      alert("Proyecto agregado con éxito");
      fetchProjects(); // Actualiza la lista de proyectos
      closeModal(); // Cierra el modal
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Proyecto</h2>
        <input
          type="text"
          placeholder="Nombre del proyecto"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />
        <input
          type="date"
          placeholder="Fecha de inicio"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />
        <input
          type="date"
          placeholder="Fecha de fin"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddProject}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalActivities;
