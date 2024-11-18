// EditUser.js

import { useState } from "react";
import { supabase } from "../../Js/database/supabaseClient";

const EditUser = ({ user, closeModal, fetchUsers }) => {
  const [formData, setFormData] = useState({
    username: user.username,
    name: user.name,
    lastName: user.lastName,
    dni: user.dni,
    telefono: user.telefono,
    direccion: user.direccion,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
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
        .eq("id", user.id);

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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              DNI
            </label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
            />
          </div>
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

export default EditUser;
