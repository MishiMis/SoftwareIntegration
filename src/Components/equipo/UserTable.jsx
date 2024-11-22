import { useState, useEffect } from "react";
import { supabase } from "../../Js/database/supabaseClient";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdDeleteSweep } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
import 'react-tippy/dist/tippy.css';
import { Tooltip } from 'react-tippy';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false); 

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(3);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role_id", 1);

      if (error) throw error;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (idUsuario) => {
    const confirmed = window.confirm("¿Estás seguro de querer borrar este usuario?");
    if (!confirmed) return;

    try {
      const { error } = await supabase.from("users").delete().eq("idUsuario", idUsuario);
      if (error) throw error;
      alert("¡Usuario eliminado exitosamente!");
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
      alert("No se pudo eliminar el usuario.");
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };

  const closeEditUserModal = () => {
    setSelectedUser(null);
    setIsEditUserModalOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-4">
        <Tooltip title="Agregar Usuario">
          <button
            onClick={() => setIsAddUserModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            <FaAddressBook />
          </button>
        </Tooltip>
        <input
          type="text"
          placeholder="Search by username, name, or last name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="[&>th]:px-6 [&>th]:py-3">
                <th scope="col">Usuario</th>
                <th scope="col">Nombre</th>
                <th scope="col">Last Name</th>
                <th scope="col">DNI</th>
                <th scope="col">Telefono</th>
                <th scope="col">Direccion</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((user) => (
                <tr key={user.idUsuario} className="bg-white border-b [&>td]:px-6 [&>td]:py-4 dark:bg-gray-800 dark:border-gray-700">
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.dni}</td>
                  <td>{user.telefono}</td>
                  <td>{user.direccion}</td>
                  <td className="space-x-2">
                    <Tooltip title="Editar Usuario">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded"
                      >
                        <LiaUserEditSolid />
                      </button>
                    </Tooltip>

                    <Tooltip title="Eliminar Usuario">
                      <button
                        onClick={() => handleDeleteUser(user.idUsuario)} // Aquí se pasa idUsuario
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        <MdDeleteSweep />
                      </button>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Controles de paginado */}
          <div className="flex justify-between items-center mt-4">
            <Tooltip title="Ir a la página anterior">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400"
              >
                <GrPrevious />
              </button>
            </Tooltip>
            <span>
              Page {currentPage} of {totalPages}
            </span>

            <Tooltip title="Ir a la siguiente página">
              <button
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400"
              >
                <GrNext />
              </button>
            </Tooltip>
          </div>
        </div>
      )}

      {isAddUserModalOpen && (
        <AddUser closeModal={() => setIsAddUserModalOpen(false)} fetchUsers={fetchUsers} />
      )}

      {isEditUserModalOpen && (
        <EditUser user={selectedUser} closeModal={closeEditUserModal} fetchUsers={fetchUsers} />
      )}
    </div>
  );
};

export default UserTable;
