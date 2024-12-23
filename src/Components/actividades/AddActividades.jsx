import { useState, useEffect } from "react";
import { supabase } from "../../Js/database/supabaseClient";
import PropTypes from 'prop-types';

const AddActividades = ({ closeModal, fetchActivities }) => {
  const [formData, setFormData] = useState({
    idUsuario: "",
    idTipo: "",
    idEstado: "",
    idProyecto: "",
    actividad: "",
    servicio: "",
    horasEstimadas: "",
    horasConsumidas: "",
    fechaLimite: "",
    fechaCreacion: "",  // Añadimos fechaCreacion
  });

  const [users, setUsers] = useState([]);
  const [tipoActividad, setTipoActividad] = useState([]);
  const [estado, setEstado] = useState([]);
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("idUsuario, name")
        .eq("role_id", 1); // Traemos solo los usuarios con role_id = 1
      if (error) {
        console.error("Error fetching users:", error.message);
      } else {
        setUsers(data);
      }
    };

    const fetchTipoActividad = async () => {
      const { data, error } = await supabase
        .from("tipoActividad")
        .select("idTipo, nombre"); // Traemos idTipo y nombre de tipoActividad
      if (error) {
        console.error("Error fetching tipoActividad:", error.message);
      } else {
        setTipoActividad(data);
      }
    };

    const fetchEstado = async () => {
      const { data, error } = await supabase
        .from("estado")
        .select("idEstado, nombre"); // Traemos idEstado y nombre de estado
      if (error) {
        console.error("Error fetching estado:", error.message);
      } else {
        setEstado(data);
      }
    };

    const fetchProyectos = async () => {
      const { data, error } = await supabase
        .from("proyectos")
        .select("idProyecto, nombre"); // Traemos idProyecto y nombre de proyectos
      if (error) {
        console.error("Error fetching proyectos:", error.message);
      } else {
        setProyectos(data);
      }
    };

    fetchUsers();
    fetchTipoActividad();
    fetchEstado();
    fetchProyectos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("activities").insert([formData]);
      if (error) throw error;

      fetchActivities();
      closeModal();
    } catch (error) {
      console.error("Error adding activity:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center uppercase border-b border-gray-400">Crear Actividad</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
            {/* Campo idUsuario con lista de usuarios */}
            <div className="w-full">
              <label htmlFor="idUsuario" className="block text-sm font-medium text-gray-700">
                Usuario
              </label>
              <select
                id="idUsuario"
                name="idUsuario"
                value={formData.idUsuario}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="" disabled>Selecciona un usuario</option>
                {users.map((user) => (
                  <option key={user.idUsuario} value={user.idUsuario}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Campo idTipo con lista de tipoActividad */}
            <div className="w-full">
              <label htmlFor="idTipo" className="block text-sm font-medium text-gray-700">
                Tipo de Actividad
              </label>
              <select
                id="idTipo"
                name="idTipo"
                value={formData.idTipo}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="" disabled>Selecciona un tipo de actividad</option>
                {tipoActividad.map((tipo) => (
                  <option key={tipo.idTipo} value={tipo.idTipo}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Campo idEstado con lista de estados */}
            <div className="w-full">
              <label htmlFor="idEstado" className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <select
                id="idEstado"
                name="idEstado"
                value={formData.idEstado}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="" disabled>Selecciona un estado</option>
                {estado.map((estadoItem) => (
                  <option key={estadoItem.idEstado} value={estadoItem.idEstado}>
                    {estadoItem.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Campo idProyecto con lista de proyectos */}
            <div className="w-full">
              <label htmlFor="idProyecto" className="block text-sm font-medium text-gray-700">
                Proyecto
              </label>
              <select
                id="idProyecto"
                name="idProyecto"
                value={formData.idProyecto}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="" disabled>Selecciona un proyecto</option>
                {proyectos.map((proyecto) => (
                  <option key={proyecto.idProyecto} value={proyecto.idProyecto}>
                    {proyecto.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Campo fechaCreacion */}
            <div className="w-full">
              <label htmlFor="fechaCreacion" className="block text-sm font-medium text-gray-700">
                Fecha de Creación
              </label>
              <input
                type="date"
                id="fechaCreacion"
                name="fechaCreacion"
                value={formData.fechaCreacion}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Resto de campos */}
            {Object.keys(formData).map((field) =>
              field !== "idUsuario" && field !== "idTipo" && field !== "idEstado" && field !== "idProyecto" && field !== "fechaCreacion" ? (
                <div key={field} className="w-full">
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                    {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <input
                    type={field === "fechaLimite" ? "date" : "text"}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder={`Ingrese ${field}`}
                  />
                </div>
              ) : null
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
            >
              Cerrar
            </button>

            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddActividades.propTypes = {
  closeModal: PropTypes.func.isRequired,
  fetchActivities: PropTypes.func.isRequired,
};

export default AddActividades;
