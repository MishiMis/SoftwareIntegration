// EditActividades.jsx
import { useState, useEffect } from "react";
import { supabase } from "../../Js/database/supabaseClient";
import PropTypes from "prop-types";

const EditActividades = ({ activityId, closeModal, fetchActivities }) => {
  const [formData, setFormData] = useState({
    idUsuario: "",
    idTipo: "",
    idEstado: "",
    actividad: "",
    servicio: "",
    horasEstimadas: "",
    horasConsumidas: "",
    fechaLimite: "",
  });

  useEffect(() => {
    const fetchActivityData = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("idActividad", activityId)
        .single();

      if (error) {
        console.error("Error fetching activity data:", error.message);
      } else {
        setFormData(data);
      }
    };

    if (activityId) {
      fetchActivityData();
    }
  }, [activityId]);

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
      const { error } = await supabase
        .from("activities")
        .update(formData)
        .eq("idActividad", activityId);

      if (error) throw error;

      fetchActivities();
      closeModal();
    } catch (error) {
      console.error("Error updating activity:", error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
      {/* Edit Activity */}
        <h2 className="text-2xl font-semibold mb-4 border-b text-center uppercase">Editar Actividad</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-4">

          
            {Object.keys(formData).map((field) => (
              <div key={field} className="relative z-0 w-full mb-5 group">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor={field}
                >
                  {field}
                </label>
                <input
                  type={field === "fechaLimite" ? "date" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="block py-0.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
            >
              actulizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
EditActividades.propTypes = {
  activityId: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchActivities: PropTypes.func.isRequired,
};
export default EditActividades;
