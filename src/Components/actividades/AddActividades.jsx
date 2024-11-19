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
        {/* Add Activity */}
        <h2 className="text-2xl font-semibold mb-6 text-center uppercase border-b border-gray-400 "> Crear Actividad</h2>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="grid md:grid-cols-2 md:gap-4">

          
          {Object.keys(formData).map((field) => (
            <div key={field} className="relative z-0 w-full mb-5 group">


              {/* <label
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                htmlFor={field}
              >
                {field}
              </label> */}

              <input
                type={field === "fechaLimite" ? "date" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                placeholder={field}	
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
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddActividades;
