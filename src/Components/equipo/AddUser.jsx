import { useState } from "react";
import { supabase } from "../../Js/database/supabaseClient";
import PropTypes from 'prop-types';

const AddUser = ({ closeModal, fetchUsers }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastName, setApellidos] = useState(""); // Apellidos en vez de lastName
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [password, setPassword] = useState("");  // Campo para la contraseña
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddUser = async () => {
    setLoading(true);
    setErrorMessage("");  // Resetear error
  
    try {
      // Verificar si el username ya existe
      const { data: existingUser } = await supabase
        .from("users")
        .select("username")
        .eq("username", username)
        .single();
  
      if (existingUser) {
        setErrorMessage("Username already exists. Please choose another one.");
        setLoading(false);
        return;
      }
  
      // Insertar el nuevo usuario en la base de datos
      const { error } = await supabase.from("users").insert([
        {
          username,
          name,
          lastName, // Guardar los apellidos
          dni,
          telefono,
          direccion,
          password,  // Incluir el campo password (sin hash por ahora)
          role_id: 1, // El rol por defecto es 1
          created_at: new Date().toISOString(), // Usar 'created_at' para la fecha de creación
        },
      ]);
  
      if (error) {
        throw error;
      }
  
      // Cerrar el modal después de agregar el usuario
      closeModal();
      alert("User added successfully!");
      
      // Recargar la lista de usuarios para que aparezca el nuevo usuario
      fetchUsers();  // Llamar a la función fetchUsers para actualizar la tabla de usuarios
    } catch (error) {
      console.error("Error adding user:", error.message);
      alert("Error adding user: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4 uppercase text-center border-b-2">Agregar Usuario</h2>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddUser();
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 mb-4 w-full"
            required
          />
                    <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-4 w-full"
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mb-4 w-full"
            required
          />
          <input
            type="text"
            placeholder="Apellidos"
            value={lastName}
            onChange={(e) => setApellidos(e.target.value)}
            className="border p-2 mb-4 w-full"
            required
          />
          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="border p-2 mb-4 w-full"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="border p-2 mb-4 w-full"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="border p-2 mb-4 w-full"
            required
          />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg w-full"
            disabled={loading}
          >
            {loading ? "Adding..." : "Agregar usuario"}
          </button>
        </form>
        <button
          onClick={closeModal}
          className="mt-4 text-sm text-red-500 hover:text-red-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AddUser;
AddUser.propTypes = {
  closeModal: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};