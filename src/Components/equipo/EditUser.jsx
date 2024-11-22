import { useState, useEffect } from "react";
import { supabase } from "../../Js/database/supabaseClient";
import PropTypes from 'prop-types';


const EditUser = ({ user, closeModal, fetchUsers }) => {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    name: user?.name || "",
    lastName: user?.lastName || "",
    dni: user?.dni || "",
    telefono: user?.telefono || "",
    direccion: user?.direccion || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        dni: user.dni,
        telefono: user.telefono,
        direccion: user.direccion,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    if (!user?.idUsuario) {
      alert("User ID is missing.");
      return;
    }

    try {
      const { error } = await supabase
        .from("users")
        .update({
          username: formData.username,
          name: formData.name,
          lastName: formData.lastName,
          dni: formData.dni,
          telefono: formData.telefono,
          direccion: formData.direccion,
        })
        .eq("idUsuario", user.idUsuario);  // Aseguramos que usamos el campo correcto para la búsqueda

      if (error) throw error;

      alert("User updated successfully!");
      fetchUsers(); // Refresca la lista de usuarios
      closeModal(); // Cierra el modal
    } catch (error) {
      console.error("Error updating user:", error.message);
      alert("Failed to update user.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit User</h2>

        <div className="space-y-4">
          {[
            { label: "Username", name: "username" },
            { label: "Name", name: "name" },
            { label: "Last Name", name: "lastName" },
            { label: "DNI", name: "dni" },
            { label: "Phone", name: "telefono" },
            { label: "Address", name: "direccion" }
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateUser}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
EditUser.propTypes = {
  user: PropTypes.shape({
    idUsuario: PropTypes.number.isRequired,
    username: PropTypes.string, name: PropTypes.string, lastName: PropTypes.string, dni: PropTypes.string, telefono: PropTypes.string, direccion: PropTypes.string
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired
};

export default EditUser;
