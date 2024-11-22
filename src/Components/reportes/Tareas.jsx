import { useState, useEffect } from "react";
import { supabase } from "../../Js/database/supabaseClient";
import ModalTareas from "./ModalTareas";
import imguser from "../../assets/userSin.png"
const Tareas = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("idUsuario, name")
      .eq("role_id", 1); // Filtrar por role_id = 1

    if (error) {
      console.error("Error fetching users:", error.message);
    } else {
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl text-white text-center ">Usuarios</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {users.map((user) => (
          <div
            key={user.idUsuario}
            className="p-4 border border-gray-300 rounded-lg shadow-md w-[250px] flex flex-col  justify-center items-center"
          >
            <h2 className="text-lg font-semibold mb-2">{user.name}</h2>
            <img src={imguser} alt="sdsd"  className="w-24 h-24 rounded-full border-2"/>


              <button
                onClick={() => openModal(user)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg m-2 "
              >
                Ver Tareas
              </button>

          </div>
        ))}
      </div>
      {showModal && (
        <ModalTareas user={selectedUser} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Tareas;
