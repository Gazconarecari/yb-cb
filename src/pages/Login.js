import { useState } from 'react';
import { supabase } from '../supabaseClient';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir la recarga de página

    if (!username || !password) {
      console.log('Username y contraseña son obligatorios');
      return;
    }

    // Consultamos la base de datos para encontrar al usuario con el username y password correctos
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();  // Para que devuelva un solo usuario si coincide

    if (error) {
      console.log('Error al iniciar sesión:', error.message);
    } else if (data) {
      console.log('Inicio de sesión exitoso:', data);
      setUser(data);  // Guardamos el usuario en el estado global y localStorage
    } else {
      console.log('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;