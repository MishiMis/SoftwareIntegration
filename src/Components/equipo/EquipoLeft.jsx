import React, { useState, useEffect } from 'react';
import { supabase } from "../../Js/database/supabaseClient";
import ChatModal from './ChatModal';

const EquipoLeft = () => {
  const [users, setUsers] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, role_id')
        .eq('role_id', 1);

      if (error) {
        console.error(error);
      } else {
        setUsers(data);
      }
    };
    getUsers();
  }, []);

  const openChat = (user) => {
    setCurrentUser(user);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setCurrentUser(null);
  };

  return (
    <div className="container mx-auto">
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded-md"
                  onClick={() => openChat(user)}
                >
                  Chatear
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Chat */}
      {isChatOpen && (
        <ChatModal
          user={currentUser}
          closeChat={closeChat}
        />
      )}
    </div>
  );
};

export default EquipoLeft;
