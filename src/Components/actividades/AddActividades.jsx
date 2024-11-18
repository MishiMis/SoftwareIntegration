// AddActividades.jsx
import { useState } from "react";
import { supabase } from "../../Js/database/supabaseClient";

const AddActividades = ({ closeModal, fetchActivities }) => {
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
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-semibold mb-4">Add Activity</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((field) => (
            <div key={field} className="mb-4">
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
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          ))}
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
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActividades;
