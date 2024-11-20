import  { useState } from 'react';

const ChatModal = ({ user, closeChat }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Enviar mensaje
  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { from: 'Tú', content: message }]);
      setMessage('');
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Chat con {user.name}</h2>
          <button className="text-xl font-semibold" onClick={closeChat}>
            &times;
          </button>
        </div>
        <div className="mt-4" style={{ height: '300px', overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <p className={`p-2 rounded ${msg.from === 'Tú' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <strong>{msg.from}: </strong>{msg.content}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Escribe tu mensaje..."
          />
          <button
            onClick={sendMessage}
            className="w-full bg-blue-500 text-white py-2 mt-2 rounded-md"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
