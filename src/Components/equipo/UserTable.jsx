import { useState, useEffect } from "react";
import { supabase } from "../../Js/database/supabaseClient";
import AddUser from "./AddUser";
import EditUser from "./EditUser";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false); 

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);

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

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) throw error;
      alert("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error.message);
      alert("Failed to delete user.");
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
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add User
        </button>

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
        <div>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Username</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Last Name</th>
                <th className="border p-2">DNI</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((user) => (
                <tr key={user.id}>
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.lastName}</td>
                  <td className="border p-2">{user.dni}</td>
                  <td className="border p-2">{user.telefono}</td>
                  <td className="border p-2">{user.direccion}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Controles de paginado */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {isAddUserModalOpen && (
        <AddUser
          closeModal={() => setIsAddUserModalOpen(false)}
          fetchUsers={fetchUsers}
        />
      )}

      {isEditUserModalOpen && (
        <EditUser
          user={selectedUser}
          closeModal={closeEditUserModal}
          fetchUsers={fetchUsers}
        />
      )}
    </div>
  );
};

export default UserTable;
