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
    <div className="relative overflow-x-auto rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr >
            <th className="px-6 py-3 text-left">Nombre</th>
            <th className="px-6 py-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
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
