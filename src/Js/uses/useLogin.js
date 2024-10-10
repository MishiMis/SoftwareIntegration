import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../database/supabaseClient";
import { toast } from "react-toastify"; 

export const useLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e, setLoading) => { 
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase 
      .from('users') 
      .select('*') 
      .eq('username', username)
      .eq('password', password) 
      .single();

    if (error) { 
      console.error('Error al iniciar sesión:', error.message);
      toast.error('Error al iniciar sesión. Inténtalo de nuevo.');

      setLoading(false);
    } else if (data) {
      console.log('Acceso correcto');
      toast.info(`Bienvenido ${data.name}`);
      setError(null);

      const roleId = data.role_id;
      if (roleId === 1) {
        navigate('/main');
      } else if (roleId === 2) {
        navigate('/mainAdmin');
      } else {
        console.error('Rol no reconocido:', roleId);
        setError('Rol no reconocido.');
      }

      setLoading(false);
    }
  };

  return {
    
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleLogin,
    
  };
};
