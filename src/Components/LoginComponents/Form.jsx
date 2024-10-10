import { useLogin } from "../../Js/uses/useLogin.js";
import LoadingModal from '../ModalsComponents/LoadingModal.jsx';
import { useState } from 'react';

const Form = () => {
    const { 
        username, 
        setUsername, 
        password, 
        setPassword, 
        error, 
        handleLogin 
      } = useLogin();
    
      const [isLoading, setIsLoading] = useState(false); 
  return (
      <div className="bg-white p-8 rounded-lg shadow-lg w-[80%] max-w-md">
        {isLoading && <LoadingModal />}
      <h2 className="text-3xl font-semibold text-center mb-6">Log in</h2>
      <form onSubmit={(e) => handleLogin(e, setIsLoading)}  className="flex flex-col space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            name="username"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Introduce tu contraseña"
            name="password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
          />
        </div>
        {error && <p className="error-message text-red-600">{error}</p>} 

        <button
          type="submit"
          className="w-full bg-[#138ae4] text-white py-3 rounded-lg font-medium hover:bg-[#066dc3] transition-colors"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}

export default Form
