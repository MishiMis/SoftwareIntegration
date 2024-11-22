import { useState } from "react";
import { supabase } from "../../Js/database/supabaseClient";
import PropTypes from "prop-types";

const AddUser = ({ closeModal, fetchUsers }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState(""); 
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddUser = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const { data: existingUser } = await supabase
        .from("users")
        .select("username")
        .eq("username", username)
        .single();

      if (existingUser) {
        setErrorMessage("El nombre de usuario ya existe. Por favor, elige otro.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("users").insert([
        {
          username,
          name,
          lastName,
          dni,
          telefono,
          direccion,
          password, 
          role_id: 1, 
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      alert("Usuario agregado con éxito!");
      fetchUsers(); 
      closeModal(); 
    } catch (error) {
      console.error("Error al agregar usuario:", error.message);
      alert("Error al agregar usuario: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Usuario</h2>
        {errorMessage && (
          <div className="text-red-500 bg-red-100 p-2 rounded-lg mb-4">
            {errorMessage}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddUser();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          <input
            type="text"
            placeholder="Apellidos"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-lg ${
                loading ? "bg-blue-300" : "bg-blue-500"
              }`}
              disabled={loading}
            >
              {loading ? "Agregando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddUser.propTypes = {
  closeModal: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

export default AddUser;
